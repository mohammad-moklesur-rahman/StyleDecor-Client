import { useEffect, useState } from "react";

import useAxios from "../hooks/useAxios";
import { useParams } from "react-router";
import useAuth from "../hooks/UseAuth";
import BookingModal from "../components/Services/ServiceDetails/BookingModal";

const ServiceDetails = () => {
  const { id } = useParams();
  const axios = useAxios();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    axios.get(`/services/${id}`).then((res) => {
      setService(res.data);
      setLoading(false);
    });
  }, [axios, id]);

  if (loading) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Image */}
      <img
        src={service.image}
        alt={service.service_name}
        className="w-full h-[350px] object-cover rounded-xl shadow"
      />

      <h1 className="text-3xl font-bold mt-6 text-primary">
        {service.service_name}
      </h1>

      <p className="mt-2 text-gray-600">
        Category:{" "}
        <span className="font-semibold">{service.service_category}</span>
      </p>

      <p className="mt-1 text-gray-700">
        Cost: <span className="font-semibold">{service.cost} BDT</span> (
        {service.unit})
      </p>

      <p className="mt-6 text-gray-700 leading-relaxed">
        {service.description}
      </p>

      {/* Book Now Button */}
      <button
        onClick={() => {
          if (!user) {
            return alert("Please login first to book.");
          }
          setOpenModal(true);
        }}
        className="btn btn-primary mt-8"
      >
        Book Now
      </button>

      {/* Booking Modal */}
      {openModal && (
        <BookingModal
          service={service}
          user={user}
          closeModal={() => setOpenModal(false)}
        />
      )}
    </div>
  );
};

export default ServiceDetails;
