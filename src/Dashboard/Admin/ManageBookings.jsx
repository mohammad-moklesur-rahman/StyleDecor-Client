import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const ManageBookings = () => {
  const axios = useAxios();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings/get-admin").then((res) => {
      setBookings(res.data);
    });
  }, [axios]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Bookings</h2>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>User</th>
              <th>Service Name</th>
              <th>Booking Date</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.userEmail}</td>
                <td>{booking.service_name}</td>
                <td>{booking.booking_date}</td>
                <td>৳{booking.cost}</td>
                <td>
                  {booking.status === "Completed" ? (
                    <span className="text-green-600 font-bold">Paid</span>
                  ) : (
                    <span className="text-red-600 font-bold">Unpaid</span>
                  )}
                </td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="border rounded-lg p-4 shadow-sm bg-base-100"
          >
            <p className="text-sm">
              <span className="font-semibold">User:</span> {booking.userEmail}
            </p>

            <p className="text-sm">
              <span className="font-semibold">Service:</span>{" "}
              {booking.service_name}
            </p>

            <p className="text-sm">
              <span className="font-semibold">Date:</span>{" "}
              {booking.booking_date}
            </p>

            <p className="text-sm">
              <span className="font-semibold">Cost:</span> ৳{booking.cost}
            </p>

            <p className="text-sm">
              <span className="font-semibold">Payment:</span>{" "}
              {booking.status === "Completed" ? (
                <span className="text-green-600 font-bold">Paid</span>
              ) : (
                <span className="text-red-600 font-bold">Unpaid</span>
              )}
            </p>

            <p className="text-sm">
              <span className="font-semibold">Status:</span> {booking.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBookings;
