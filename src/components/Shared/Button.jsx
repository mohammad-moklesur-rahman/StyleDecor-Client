import { motion as Motion } from "framer-motion";

const Button = ({ className, children }) => {
  return (
    <Motion.button
      className={`relative btn border-0 overflow-hidden text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg ${className}`}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.25 }}
    >
      <span className="relative z-10">{children}</span>

      {/* Glow background */}
      <Motion.div
        className="absolute inset-0 bg-white opacity-10 blur-xl"
        whileHover={{ opacity: 0.2 }}
        transition={{ duration: 0.3 }}
      />
    </Motion.button>
  );
};

export default Button;
