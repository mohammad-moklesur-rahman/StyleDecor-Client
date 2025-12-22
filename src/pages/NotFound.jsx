import { motion as Motion } from "framer-motion";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import MyContainer from "../components/Shared/MyContainer";

const NotFound = () => {
  return (
    <MyContainer>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 transition-colors duration-300 bg-white dark:bg-gray-900">
        {/* 404 Title */}
        <Motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-8xl md:text-9xl font-extrabold text-secondary dark:text-green-400 mb-4"
        >
          404
        </Motion.h1>

        {/* Subtitle */}
        <Motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-2xl md:text-3xl font-semibold text-accent dark:text-green-300 mb-3"
        >
          Oops! Page Not Found 🐾
        </Motion.h2>

        {/* Description */}
        <Motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-gray-600 dark:text-gray-300 mb-8 max-w-md"
        >
          The page you’re looking for doesn’t exist or has been moved. Let’s get
          you back to a safe spot.
        </Motion.p>

        {/* Button */}
        <Motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Link
            to="/"
            className="flex items-center gap-2 bg-secondary hover:bg-accent text-green-500 dark:text-gray-900 dark:hover:text-green-800 font-semibold px-6 py-3 rounded-full transition-all duration-300"
          >
            <FaArrowLeft /> Back to Home
          </Link>
        </Motion.div>

        {/* Illustration */}
        <Motion.img
          src="https://cdn-icons-png.flaticon.com/512/7486/7486803.png"
          alt="404 illustration"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="w-64 md:w-80 mt-10 drop-shadow-lg"
        />
      </div>
    </MyContainer>
  );
};

export default NotFound;
