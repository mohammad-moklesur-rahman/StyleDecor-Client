import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import Button from "../components/Shared/Button";

const Register = () => {
  const [show, setShow] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="bg-[#FEEAC9]">
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#FFCDC9] px-6 py-2 my-10 rounded-2xl"
        >
          <h2 className="text-2xl font-semibold text-gray-700 text-center my-2">
            Register
          </h2>

          <fieldset className="fieldset rounded-box px-2 mb-4">
            {/* NAME */}
            <label className="label">Name</label>
            <input
              type="text"
              placeholder="Enter Full Name"
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
              className="file-input file-input-bordered w-full"
              {...register("photo")}
            />

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
                onClick={() => setShow(!show)}
                className="absolute top-3 right-3 cursor-pointer"
              >
                {show ? <FiEye /> : <FiEyeOff />}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}

            {/* SUBMIT BUTTON */}
            <Button className="mt-4 w-full">Register</Button>

            <div className="divider">OR</div>

            {/* GOOGLE LOGIN */}
            <button
              type="button"
              className="btn w-full text-green-600 bg-secondary hover:bg-primary hover:text-white transition-all"
            >
              <FcGoogle size={25} /> Login with Google
            </button>

            {/* LOGIN LINK */}
            <p className="text-[13px] mt-3 text-center">
              Already have an Account? Please{" "}
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
