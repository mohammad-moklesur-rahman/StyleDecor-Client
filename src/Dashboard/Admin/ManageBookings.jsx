import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const ManageBookings = () => {
  const axios = useAxios();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((res) => {
      setBookings(res.data);
    });
  }, [axios]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Bookings</h2>

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
  );
};

export default ManageBookings;
