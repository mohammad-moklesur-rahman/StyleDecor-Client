import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateProjectStatus = () => {
  const axiosSecure = useAxiosSecure();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    await axiosSecure
      .get("/decorators/my-projects")
      .then((res) => setProjects(res.data));
  };

  const handleStatusChange = async (id, dec_status) => {
    await axiosSecure.patch(`/decorators/update-status/${id}`, { dec_status });
    loadProjects();
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Update Project Status
      </h2>

      {/* Responsive table wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Service</th>
              <th className="border p-2 text-left">Current Status</th>
              <th className="border p-2 text-left">Update</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((p) => (
              <tr key={p._id} className="text-center md:text-left">
                <td className="border p-2">{p.service_name}</td>
                <td className="border p-2">{p.dec_status}</td>
                <td className="border p-2">
                  <select
                    value={p.dec_status}
                    onChange={(e) => handleStatusChange(p._id, e.target.value)}
                    className="border px-2 py-1 w-full md:w-auto"
                  >
                    <option value="Assigned">Assigned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpdateProjectStatus;
