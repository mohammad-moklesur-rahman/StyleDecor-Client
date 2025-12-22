import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router";
import Button from "../components/Shared/Button";

import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";

import axios from "axios";
import useAuth from "../hooks/UseAuth";
import { updateProfile } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useSaveOrUpdateUser } from "../utils/UserDataFunc";
import AuthLoading from "../components/Shared/AuthLoading";

const Register = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // * navigate previous path
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, from, navigate]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(true);
  const [imagePublicId, setImagePublicId] = useState("");
  const { signUpWithEmailAndPassWord, setUser, signInWithGoogle, authLoading } =
    useAuth();
  const saveOrUpdateUser = useSaveOrUpdateUser();

  const cloudName = `${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}`; // Cloudinary cloud name
  const uploadPreset = `${import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET}`; // Cloudinary unsigned preset

  // Cloudinary instance for display
  const cld = new Cloudinary({ cloud: { cloudName } });
  const uploadedImg = imagePublicId
    ? cld
        .image(imagePublicId)
        .format("auto")
        .quality("auto")
        .resize(auto().gravity(autoGravity()).width(200).height(200))
    : null;

  // Upload image to Cloudinary via API
  const uploadPhoto = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      setImagePublicId(res.data.public_id);
      setValue("photo", res.data.secure_url); // store URL in RHF
    } catch (err) {
      console.error("Cloudinary upload error:", err);
    }
  };

  const onSubmit = async (data) => {
    try {
      // Create Firebase user
      const res = await signUpWithEmailAndPassWord(data.email, data.password);

      // save or update user in DB
      await saveOrUpdateUser({
        name: data.name,
        email: data.email,
        photo: data.photo,
      });

      const currentUser = res.user;

      // Update Firebase profile
      await updateProfile(currentUser, {
        displayName: data.name,
        photoURL: data.photo,
      });

      // 3. Save user
      setUser(currentUser);

      alert("Registration Successful!");
    } catch (err) {
      console.error("Firebase error:", err);
      alert(err.message);
    }
  };

  // * Login With Google
  const handelGoogleLogin = async () => {
    const { user } = await signInWithGoogle();

    // save or update user in DB
    await saveOrUpdateUser({
      name: user?.displayName,
      email: user?.email,
      photo: user?.photoURL,
    });
  };

  if (authLoading) return <AuthLoading />;

  return (
    <div className="bg-[#FEEAC9]">
      <div className="flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#FFCDC9] px-6 py-4 my-10 rounded-2xl"
        >
          <h2 className="text-2xl font-semibold text-gray-700 text-center my-2">
            Register
          </h2>

          <fieldset className="fieldset rounded-box px-2 mb-4">
            {/* NAME */}
            <label className="label">Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}

            {/* PHOTO */}
            <label className="label">Photo</label>
            <input
              type="file"
              className="file-input file-input-bordered w-full mb-2"
              onChange={(e) => uploadPhoto(e.target.files[0])}
            />
            {uploadedImg && (
              <div className="mt-2 w-32 h-32">
                <AdvancedImage cldImg={uploadedImg} />
              </div>
            )}
            <input type="hidden" {...register("photo")} />

            {/* EMAIL */}
            <label className="label">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}

            {/* PASSWORD */}
            <label className="label">Password</label>
            <div className="relative">
              <input
                type={show ? "password" : "text"}
                placeholder="Password"
                className="input input-bordered w-full"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              <div
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => setShow(!show)}
              >
                {show ? <FiEye /> : <FiEyeOff />}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}

            {/* SUBMIT */}
            <Button className="mt-4 w-full">Register</Button>

            <div className="divider">OR</div>

            {/* GOOGLE LOGIN */}
            <button
              onClick={handelGoogleLogin}
              type="button"
              className="btn w-full text-green-600 bg-secondary hover:bg-primary hover:text-white transition-all"
            >
              <FcGoogle size={25} /> Login with Google
            </button>

            <p className="text-[13px] mt-3 text-center">
              Already have an Account?{" "}
              <Link to="/login" className="text-pink-500 underline">
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
