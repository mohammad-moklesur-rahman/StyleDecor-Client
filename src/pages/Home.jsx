import CategoriesSection from "../components/Home/CategoriesSection";
import DynamicServicesSection from "../components/Home/DynamicServicesSection";
import HeroSection from "../components/Home/HeroSection";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section>
        <HeroSection />
      </section>

      {/* CategorY Section */}
      <section>
        <CategoriesSection />
      </section>

      {/* Decoration Services */}
      <section>
        <DynamicServicesSection />
      </section>
    </>
  );
};

export default Home;
