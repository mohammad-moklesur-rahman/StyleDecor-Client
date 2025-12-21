import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const EarningsSummary = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (user?.email) {
      // use email instead of _id
      axiosSecure
        .get("/decorators/earnings-summary")
        .then((res) => setData(res.data));
    }
  }, [axiosSecure, user]);
  console.log(data)

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      {/* SUMMARY */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card bg-green-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold">Completed Projects</h2>
          <p className="text-3xl">{data.totalProjects}</p>
        </div>

        <div className="card bg-blue-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold">Total Commission (10%)</h2>
          <p className="text-3xl">৳{data.totalCommission}</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto mt-6">
        <table className="table w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Service</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Cost</th>
              <th className="p-2 border">Commission (10%)</th>
            </tr>
          </thead>
          <tbody>
            {data.projects.map((p, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-2 border">{p.service_name}</td>
                <td className="p-2 border">
                  {new Date(p.booking_date).toLocaleDateString()}
                </td>
                <td className="p-2 border">৳{p.cost}</td>
                <td className="p-2 border text-green-600 font-bold">
                  ৳{p.commission}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EarningsSummary;
