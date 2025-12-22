import { FaStar, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const TopDecorators = () => {
  const axios = useAxios();
  const [decorators, setDecorators] = useState([]);

  useEffect(() => {
    axios.get("/decorators?status=approved").then((res) => {
      setDecorators(res.data);
    });
  }, [axios]);

  return (
    <section className="py-16 bg-secondary-content">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-center mb-4">Top Decorators</h2>
        <p className="text-base-content/70 mb-10">
          Meet our most trusted and highly rated decorators
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {decorators.slice(0, 4).map((decorator) => (
            <div
              key={decorator._id}
              className="card bg-base-100 shadow-xl text-center"
            >
              <figure className="px-6 pt-6">
                <img
                  src={decorator.photo}
                  alt={decorator.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto"
                />
              </figure>

              <div className="card-body items-center">
                <h3 className="card-title">{decorator.name}</h3>

                {/* Rating */}
                <div className="flex items-center gap-1 text-warning">
                  <FaStar />
                  <span className="font-semibold">
                    {decorator.rating || "4.9"}
                  </span>
                </div>

                {/* Specialties */}
                <h2 className="mt-3 font-semibold text-sm uppercase tracking-wide">
                  Specialties
                </h2>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {decorator.specialties?.map((item, index) => (
                    <span
                      key={index}
                      className="badge badge-outline badge-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Availability */}
                <div className="mt-3 flex items-center gap-2">
                  {decorator.isAvailable ? (
                    <>
                      <FaCheckCircle className="text-success" />
                      <span className="text-success font-medium">
                        Available
                      </span>
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="text-error" />
                      <span className="text-error font-medium">
                        Not Available
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDecorators;
