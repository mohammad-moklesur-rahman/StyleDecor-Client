import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { motion as Motion } from "framer-motion";
import useAxios from "../hooks/useAxios";

const Services = () => {
  const axios = useAxios();
  const location = useLocation();

  // Read query param category
  const queryCategory = new URLSearchParams(location.search).get("category");

  const [services, setServices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // Set category based on query param
  const [category, setCategory] = useState(queryCategory || "All");

  const [sort, setSort] = useState("");

  useEffect(() => {
    axios
      .get("/services")
      .then((res) => {
        setServices(res.data);
        setFiltered(res.data);
        setLoading(false);
      })
      .catch();
  }, [axios]);

  // Search + Category + Sort Filter
  useEffect(() => {
    let data = [...services];

    // Search
    if (search) {
      data = data.filter((s) =>
        s.service_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (category !== "All") {
      data = data.filter((s) => s.service_category === category);
    }

    // Sort
    if (sort === "low") {
      data.sort((a, b) => a.cost - b.cost);
    }
    if (sort === "high") {
      data.sort((a, b) => b.cost - a.cost);
    }

    setFiltered(data);
  }, [search, category, sort, services]);

  return (
    <div className="bg-[#D2DCB6] py-16">
      <h2 className="text-3xl text-center font-bold text-primary mb-10">
        All Decoration Services
      </h2>

      {/* Search + Filter + Sort */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-4 mb-8">
        {/* Search */}
        <input
          type="text"
          placeholder="Search service..."
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full"
        />

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="All">All Categories</option>
          <option value="Wedding">Wedding</option>
          <option value="Birthday">Birthday</option>
          <option value="Party">Party</option>
          <option value="Celebration">Celebration</option>
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="">Sort by Price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      {/* Services Grid */}
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

        {/* Services */}
        {!loading &&
          filtered.map((service) => (
            <Motion.div
              key={service._id}
              whileHover={{ scale: 1.03 }}
              className="card bg-base-200 shadow-xl border border-gray-200"
            >
              <figure className="h-48">
                <img
                  src={service.image}
                  alt={service.service_name}
                  className="w-full h-full object-cover"
                />
              </figure>

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
                  <Link to={`/services/${service._id}`} className="btn btn-sm btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </Motion.div>
          ))}
      </div>

      {/* No Results */}
      {!loading && filtered.length === 0 && (
        <p className="text-center text-gray-500 text-lg mt-10">
          No services found.
        </p>
      )}
    </div>
  );
};

export default Services;
