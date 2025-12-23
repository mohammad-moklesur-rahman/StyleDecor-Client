import { motion as Motion } from "framer-motion";
import MyContainer from "../components/Shared/MyContainer";

const About = () => {
  return (
    <div className="bg-secondary-content py-20 px-4">
      <MyContainer>
        <Motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-8"
        >
          About <span className="text-primary">StyleDecor</span>
        </Motion.h1>

        <p className="text-center max-w-3xl mx-auto text-lg text-gray-600 mb-12">
          StyleDecor is a modern Smart Home & Ceremony Decoration Booking System
          designed to simplify decoration service management for both customers
          and service providers.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="card bg-base-200 shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">🎯 Our Mission</h3>
            <p className="text-gray-600">
              To eliminate manual booking hassles and provide a seamless,
              digital-first decoration service experience.
            </p>
          </div>

          <div className="card bg-base-200 shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">💡 Why StyleDecor?</h3>
            <p className="text-gray-600">
              We combine smart scheduling, real-time project tracking, and
              secure payments to modernize local decoration businesses.
            </p>
          </div>

          <div className="card bg-base-200 shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">🤝 What We Offer</h3>
            <p className="text-gray-600">
              Home decoration, wedding setup, event styling, on-site services,
              and professional decorators — all in one platform.
            </p>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default About;
