import { Link } from "react-router";
import { motion as Motion } from "framer-motion";
import MyContainer from "../Shared/MyContainer";

const categories = [
  {
    id: 1,
    title: "Birthday",
    image: "https://i.ibb.co.com/yFpF8Qdw/Birthdays.jpg",
  },
  {
    id: 2,
    title: "Wedding",
    image: "https://i.ibb.co.com/dwZht4Gv/Weddings.jpg",
  },
  {
    id: 3,
    title: "Party",
    image: "https://i.ibb.co.com/GfgbcBYW/Parties.jpg",
  },
  {
    id: 4,
    title: "Celebration",
    image: "https://i.ibb.co.com/8DMf1xYQ/All-Celebrations.jpg",
  },
];

export default function CategoriesSection() {
  return (
    <div className="py-20 bg-[#FFDCDC]">
      <MyContainer>
        <div className="px-4">
          <Motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-12"
          >
            Explore our categories
          </Motion.h2>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, index) => (
              <Link key={cat.id} to={`/services?category=${cat.title}`}>
                <Motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="card shadow-xl image-full cursor-pointer hover:scale-105 transition-transform"
                >
                  <figure>
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="object-cover w-full h-full"
                    />
                  </figure>
                  <div className="card-body flex items-center justify-center text-center">
                    <h2 className="card-title text-white text-2xl font-bold drop-shadow-lg">
                      {cat.title}
                    </h2>
                  </div>
                </Motion.div>
              </Link>
            ))}
          </div>
        </div>
      </MyContainer>
    </div>
  );
}
