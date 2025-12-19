import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const MyAssignedProjects = () => {
  const axios = useAxios();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("/decorators/my-projects").then((res) => setProjects(res.data));
  }, [axios]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Assigned Projects</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Service</th>
            <th className="border p-2">Booking Date</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Payment</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((p) => (
            <tr key={p._id} className="text-center">
              <td className="border p-2">{p.service_name}</td>
              <td className="border p-2">{p.booking_date}</td>
              <td className="border p-2">{p.location}</td>
              <td className="border p-2">
                <span className="bg-green-200 px-2 rounded">
                  {p.dec_status}
                </span>
              </td>
              <td className="border p-2">
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
  );
};

export default MyAssignedProjects;
