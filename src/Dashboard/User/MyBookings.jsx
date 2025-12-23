import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load bookings of logged-in user
  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/bookings`).then((res) => {
        setBookings(res.data);
        setLoading(false);
      });
    }
  }, [axiosSecure, user]);

  // Stripe Payment
  const handlePayment = async (id) => {
    try {
      const { data } = await axiosSecure.post(
        "/stripe/create-checkout-session",
        {
          bookingId: id,
          userId: user._id,
          userEmail: user.email,
        }
      );
      window.location.href = data.url;
    } catch {
      Swal.fire("Error!", "Payment could not be initiated.", "error");
    }
  };

  // Cancel Booking
  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel this booking?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/bookings/${id}`);

          // Remove from UI
          setBookings(bookings.filter((b) => b._id !== id));

          Swal.fire("Canceled!", "Your booking has been canceled.", "success");
        } catch {
          Swal.fire("Error!", "Failed to cancel booking.", "error");
        }
      }
    });
  };

  if (loading) return <p className="text-center py-20">Loading bookings...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No bookings found.</p>
      ) : (
        <>
          {/* ===================== */}
          {/* DESKTOP TABLE VIEW */}
          {/* ===================== */}
          <div className="hidden md:block overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead className="bg-base-200">
                <tr>
                  <th>#</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Cancel</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={booking._id}>
                    <td>{index + 1}</td>

                    <td>
                      <div className="flex items-center gap-3">
                        <img
                          src={booking.service_image}
                          className="w-14 h-14 rounded object-cover"
                        />
                        <div>
                          <p className="font-semibold">
                            {booking.service_name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {booking.cost} BDT
                          </p>
                        </div>
                      </div>
                    </td>

                    <td>{booking.booking_date}</td>
                    <td>{booking.location}</td>

                    <td>
                      <span
                        className={`badge ${
                          booking.status === "Completed"
                            ? "badge-success"
                            : booking.status === "Pending"
                            ? "badge-warning"
                            : "badge-info"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>

                    <td>
                      {booking.paid ? (
                        <span className="badge badge-success">Paid</span>
                      ) : (
                        <button
                          onClick={() => handlePayment(booking._id)}
                          className="btn btn-xs btn-primary"
                        >
                          Pay Now
                        </button>
                      )}
                    </td>

                    <td>
                      {!booking.paid ? (
                        <button
                          onClick={() => handleCancel(booking._id)}
                          className="btn btn-xs btn-error"
                        >
                          Cancel
                        </button>
                      ) : (
                        <button className="btn btn-xs btn-disabled">
                          Locked
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ===================== */}
          {/* MOBILE CARD VIEW */}
          {/* ===================== */}
          <div className="grid gap-4 md:hidden">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="card bg-base-100 shadow-md border"
              >
                <div className="card-body p-4">
                  <div className="flex gap-4">
                    <img
                      src={booking.service_image}
                      className="w-20 h-20 rounded object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-lg">
                        {booking.service_name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {booking.cost} BDT
                      </p>
                      <p className="text-sm">📅 {booking.booking_date}</p>
                      <p className="text-sm">📍 {booking.location}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <span
                      className={`badge ${
                        booking.status === "Completed"
                          ? "badge-success"
                          : booking.status === "Pending"
                          ? "badge-warning"
                          : "badge-info"
                      }`}
                    >
                      {booking.status}
                    </span>

                    {booking.paid ? (
                      <span className="badge badge-success">Paid</span>
                    ) : (
                      <button
                        onClick={() => handlePayment(booking._id)}
                        className="btn btn-sm btn-primary"
                      >
                        Pay
                      </button>
                    )}
                  </div>

                  {!booking.paid && (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="btn btn-sm btn-error mt-3 w-full"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyBookings;
