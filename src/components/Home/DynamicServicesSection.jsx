import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router";

const DynamicServicesSection = () => {
  const axios = useAxios();
  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/services")
      .then((res) => {
        setServices(res.data);
        setLoading(false);
      })
      .catch();
  }, [axios]);

  return (
    <div className="py-16 bg-[#D2DCB6]">
      <h2 className="text-3xl font-bold text-center mb-10 text-primary">
        Our Decoration Services
      </h2>

      {/* Grid layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {/* Loading Skeleton */}
        {loading &&
          [...Array(8)].map((_, i) => (
            <div
              key={i}
              className="card bg-base-200 shadow-xl border border-gray-200 animate-pulse"
            >
              <div className="h-48 bg-gray-300 skeleton"></div>

              <div className="card-body">
                <div className="h-4 w-3/4 bg-gray-300 rounded skeleton"></div>
                <div className="h-4 w-1/2 bg-gray-300 rounded skeleton"></div>
                <div className="h-4 w-2/3 bg-gray-300 rounded skeleton"></div>

                <div className="mt-3 flex justify-end">
                  <div className="h-8 w-20 bg-gray-300 rounded skeleton"></div>
                </div>
              </div>
            </div>
          ))}

        {!loading &&
          services.slice(0, 8).map((service) => (
            <Motion.div
              key={service._id}
              whileHover={{ scale: 1.03 }}
              className="card bg-base-200 shadow-xl border border-gray-200"
            >
              {/* Image */}
              <figure className="h-48">
                <img
                  src={service.image}
                  alt={service.service_name}
                  className="w-full h-full object-cover"
                />
              </figure>

              {/* Content */}
              <div className="card-body">
                <h2 className="card-title text-lg font-bold">
                  {service.service_name}
                </h2>

                <p className="text-sm text-gray-600">
                  Category:{" "}
                  <span className="font-semibold">
                    {service.service_category}
                  </span>
                </p>

                <p className="text-sm text-gray-700">
                  Cost:{" "}
                  <span className="font-semibold">{service.cost} BDT</span>{" "}
                  <span className="text-xs text-gray-500">
                    ({service.unit})
                  </span>
                </p>

                <div className="card-actions justify-end mt-3">
                  <Link
                    to={`/services/${service._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </Motion.div>
          ))}
      </div>
    </div>
  );
};

export default DynamicServicesSection;
