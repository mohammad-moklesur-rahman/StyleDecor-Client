import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const UpdateProjectStatus = () => {
  const axios = useAxios();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    await axios
      .get("/decorators/my-projects")
      .then((res) => setProjects(res.data));
  };

  const handleStatusChange = async (id, dec_status) => {
    await axios.patch(`/decorators/update-status/${id}`, { dec_status });
    loadProjects();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Update Project Status</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Service</th>
            <th className="border p-2">Current Status</th>
            <th className="border p-2">Update</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((p) => (
            <tr key={p._id} className="text-center">
              <td className="border p-2">{p.service_name}</td>
              <td className="border p-2">{p.dec_status}</td>
              <td className="border p-2">
                <select
                  value={p.dec_status}
                  onChange={(e) => handleStatusChange(p._id, e.target.value)}
                  className="border px-2 py-1"
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
  );
};

export default UpdateProjectStatus;
