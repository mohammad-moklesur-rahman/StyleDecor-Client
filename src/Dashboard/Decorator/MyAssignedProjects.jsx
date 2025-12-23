import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyAssignedProjects = () => {
  const axiosSecure = useAxiosSecure();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/decorators/my-projects")
      .then((res) => setProjects(res.data));
  }, [axiosSecure]);

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        My Assigned Projects
      </h2>

      {/* Make table responsive */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left text-sm sm:text-base">
                Service
              </th>
              <th className="border p-2 text-left text-sm sm:text-base">
                Booking Date
              </th>
              <th className="border p-2 text-left text-sm sm:text-base">
                Location
              </th>
              <th className="border p-2 text-left text-sm sm:text-base">
                Status
              </th>
              <th className="border p-2 text-left text-sm sm:text-base">
                Payment
              </th>
            </tr>
          </thead>

          <tbody>
            {projects.map((p) => (
              <tr key={p._id} className="text-center sm:text-left">
                <td className="border p-2 text-sm sm:text-base">
                  {p.service_name}
                </td>
                <td className="border p-2 text-sm sm:text-base">
                  {p.booking_date}
                </td>
                <td className="border p-2 text-sm sm:text-base">
                  {p.location}
                </td>
                <td className="border p-2 text-sm sm:text-base">
                  <span
                    className={`px-2 rounded ${
                      p.dec_status === "Completed"
                        ? "bg-green-200"
                        : "bg-yellow-200"
                    }`}
                  >
                    {p.dec_status}
                  </span>
                </td>
                <td className="border p-2 text-sm sm:text-base">
                  {p.paid ? (
                    <span className="text-green-600">Paid</span>
                  ) : (
                    <span className="text-red-600">Unpaid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAssignedProjects;
