import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const AssignDecorator = () => {
  const axios = useAxios();
  const [bookings, setBookings] = useState([]);
  const [decorators, setDecorators] = useState([]);
  const [selectedDecorator, setSelectedDecorator] = useState({});
  const [loading, setLoading] = useState(false);

  // Load paid bookings
  useEffect(() => {
    axios
      .get("/bookings/paid?dec_status=not assigned") // backend filter
      .then((res) => setBookings(res.data));
  }, [axios]);

  // Load available decorators
  useEffect(() => {
    axios.get("/decorators/available").then((res) => setDecorators(res.data));
  }, [axios]);

  const handleAssign = async (bookingId) => {
    if (!selectedDecorator[bookingId]) {
      alert("Please select a decorator");
      return;
    }

    try {
      setLoading(true);
      await axios.patch("/decorators/assign-decorator", {
        bookingId,
        decoratorId: selectedDecorator[bookingId],
      });

      alert("Decorator assigned successfully!");

      // remove booking from UI after assign
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (error) {
      alert(error.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Assign Decorator</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Booking ID</th>
            <th className="border p-2">Service</th>
            <th className="border p-2">Decorator</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td className="border p-2">{booking._id}</td>
              <td className="border p-2">{booking.service_name}</td>

              <td className="border p-2">
                <select
                  className="border p-1 w-full"
                  onChange={(e) =>
                    setSelectedDecorator({
                      ...selectedDecorator,
                      [booking._id]: e.target.value,
                    })
                  }
                >
                  <option value="">Select Decorator</option>
                  {decorators.map((dec) => (
                    <option key={dec._id} value={dec._id}>
                      {dec.name}
                    </option>
                  ))}
                </select>
              </td>

              <td className="border p-2">
                <button
                  disabled={loading}
                  onClick={() => handleAssign(booking._id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {bookings.length === 0 && (
        <p className="text-center mt-4">No paid bookings available</p>
      )}
    </div>
  );
};

export default AssignDecorator;
