import { motion as Motion } from "framer-motion";
import Button from "../Shared/Button";
import MyContainer from "../Shared/MyContainer";

export default function HeroSection() {
  return (
    <div className="bgImg">
      <MyContainer>
        <div className="min-h-[90vh] flex items-center justify-center text-white px-6">
          <Motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-2xl"
          >
            <Motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Make Your Special Moments Truly Magical
            </Motion.h1>

            <Motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="text-lg md:text-xl mb-10 opacity-90"
            >
              Professional decoration services for birthdays, weddings, parties,
              and all celebrations.
            </Motion.p>

            <Motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <Button className="text-lg px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform">
                Book Decoration Service
              </Button>
            </Motion.div>
          </Motion.div>
        </div>
      </MyContainer>
    </div>
  );
}
