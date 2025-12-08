import CategoriesSection from "../components/Home/CategoriesSection";
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
    </>
  );
};

export default Home;
