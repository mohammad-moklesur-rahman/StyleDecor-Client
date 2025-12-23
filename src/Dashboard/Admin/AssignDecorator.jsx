import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AssignDecorator = () => {
  const axios = useAxios();
  const axiosSecure = useAxiosSecure();

  const [bookings, setBookings] = useState([]);
  const [decorators, setDecorators] = useState([]);
  const [selectedDecorator, setSelectedDecorator] = useState({});
  const [loading, setLoading] = useState(false);

  // Load ONLY paid & not assigned bookings
  useEffect(() => {
    axios.get("/bookings/unassigned").then((res) => {
      setBookings(res.data);
    });
  }, [axios]);

  // Load available decorators
  useEffect(() => {
    axios.get("/decorators/available").then((res) => {
      setDecorators(res.data);
    });
  }, [axios]);

  const handleAssign = async (bookingId) => {
    const decoratorId = selectedDecorator[bookingId];
    if (!decoratorId) {
      alert("Please select a decorator");
      return;
    }

    try {
      setLoading(true);

      await axiosSecure.patch("/decorators/assign-decorator", {
        bookingId,
        decoratorId,
      });

      alert("Decorator assigned successfully!");

      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to assign decorator");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-bold mb-4 text-center md:text-left">
        Assign Decorator
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 hidden md:table-cell">Booking ID</th>
              <th className="border p-2">Service</th>
              <th className="border p-2">Decorator</th>
              <th className="border p-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-50">
                {/* Booking ID hidden on mobile */}
                <td className="border p-2 hidden md:table-cell">
                  {booking._id}
                </td>

                <td className="border p-2 font-medium">
                  {booking.service_name}
                </td>

                <td className="border p-2">
                  <select
                    className="border p-2 w-full rounded"
                    value={selectedDecorator[booking._id] || ""}
                    onChange={(e) =>
                      setSelectedDecorator((prev) => ({
                        ...prev,
                        [booking._id]: e.target.value,
                      }))
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

                <td className="border p-2 text-center">
                  <button
                    disabled={loading}
                    onClick={() => handleAssign(booking._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded text-sm
                      w-full md:w-auto disabled:opacity-50"
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {bookings.length === 0 && (
        <p className="text-center mt-6 text-gray-500">
          No paid unassigned bookings
        </p>
      )}
    </div>
  );
};

export default AssignDecorator;
