import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const BookingModal = ({ service, user, closeModal }) => {
  const axios = useAxios();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const bookingData = {
      serviceId: service._id,
      service_name: service.service_name,
      service_category: service.service_category,
      cost: service.cost,
      unit: service.unit,
      date: service.date,
      service_image: service.image,

      userEmail: user?.email,
      userName: user?.displayName || "User",

      booking_date: data.booking_date,
      location: data.location,

      status: "Pending",
      createdAt: new Date(),
    };

    try {
      await axios.post("/bookings", bookingData);

      Swal.fire("Success!", "Booking created successfully!", "success");
      reset();
      closeModal();

      // Navigate after success
      navigate("/dashboard/my-bookings");
    } catch {
      Swal.fire("Error!", "Failed to create booking.", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-xl relative">
        {/* Close button */}
        <button
          onClick={closeModal}
          className="btn btn-sm btn-circle absolute right-3 top-3"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-primary">
          Book Service
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Service Name */}
          <div>
            <label className="label-text">Service Name</label>
            <input
              type="text"
              value={service.service_name}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* User Email */}
          <div>
            <label className="label-text">Your Email</label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* User Name */}
          <div>
            <label className="label-text">Your Name</label>
            <input
              type="text"
              value={user?.displayName || "User"}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* Booking Date */}
          <div>
            <label className="label-text">Booking Date</label>
            <input
              type="date"
              {...register("booking_date", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          {/* Location */}
          <div>
            <label className="label-text">Event Location</label>
            <input
              type="text"
              {...register("location", { required: true })}
              placeholder="Enter event location"
              className="input input-bordered w-full"
            />
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-full">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
