import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import Button from "../components/Shared/Button";
import useAuth from "../hooks/UseAuth";

const Login = () => {
  const { loginWithEmailAndPassword, signInWithGoogle } = useAuth();
  const [show, setShow] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // * Login With Email and Password
  const onSubmit = (data) => {
    loginWithEmailAndPassword(data.email, data.password);
  };

  // * Login With Google
  const handelGoogleLogin = () => {
    signInWithGoogle();
  };

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
