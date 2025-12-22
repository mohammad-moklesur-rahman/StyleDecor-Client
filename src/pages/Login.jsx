import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useEffect, useState } from "react";
import Button from "../components/Shared/Button";
import useAuth from "../hooks/UseAuth";
import { useSaveOrUpdateUser } from "../utils/UserDataFunc";
import AuthLoading from "../components/Shared/AuthLoading";

const Login = () => {
  const { loginWithEmailAndPassword, signInWithGoogle, user, authLoading } =
    useAuth();
  const saveOrUpdateUser = useSaveOrUpdateUser();
  const [show, setShow] = useState(true);
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
    formState: { errors },
  } = useForm();

  // * Login With Email and Password
  const onSubmit = async (data) => {
    const { user } = await loginWithEmailAndPassword(data.email, data.password);

    // save or update user in DB
    await saveOrUpdateUser({
      name: user?.displayName,
      email: user?.email,
      photo: user?.photoURL,
    });
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
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#FFCDC9] px-6 py-2 my-10 rounded-2xl"
        >
          <h2 className="text-2xl font-semibold text-gray-700 text-center my-2">
            Login
          </h2>

          <fieldset className="fieldset rounded-box px-2 mb-4">
            {/* EMAIL */}
            <label className="label">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-[320px]"
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
            <Button className="mt-4 w-full">Login</Button>

            <div className="divider">OR</div>

            {/* GOOGLE LOGIN */}
            <button
              onClick={handelGoogleLogin}
              type="button"
              className="btn w-full text-green-600 bg-secondary hover:bg-primary hover:text-white transition-all"
            >
              <FcGoogle size={25} /> Login with Google
            </button>

            {/* LOGIN LINK */}
            <p className="text-[13px] mt-3 text-center">
              Don't have an Account? Please{" "}
              <Link to="/register" className="text-pink-500 underline">
                Register
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
