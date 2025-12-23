import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const EarningsSummary = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get("/decorators/earnings-summary")
        .then((res) => setData(res.data));
    }
  }, [axiosSecure, user]);

  if (!data) return <p className="text-center py-6">Loading...</p>;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card bg-green-100 p-4 rounded-lg shadow flex flex-col justify-between">
          <h2 className="text-lg font-bold mb-2">Completed Projects</h2>
          <p className="text-3xl sm:text-4xl font-semibold">
            {data.totalProjects}
          </p>
        </div>

        <div className="card bg-blue-100 p-4 rounded-lg shadow flex flex-col justify-between">
          <h2 className="text-lg font-bold mb-2">Total Commission (10%)</h2>
          <p className="text-3xl sm:text-4xl font-semibold">
            ৳{data.totalCommission}
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border text-left">Service</th>
              <th className="p-2 border text-left">Date</th>
              <th className="p-2 border text-left">Cost</th>
              <th className="p-2 border text-left">Commission (10%)</th>
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

      {/* MOBILE CARDS */}
      <div className="sm:hidden space-y-4">
        {data.projects.map((p, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <p className="font-semibold">{p.service_name}</p>
            <p>Date: {new Date(p.booking_date).toLocaleDateString()}</p>
            <p>Cost: ৳{p.cost}</p>
            <p className="text-green-600 font-bold">
              Commission: ৳{p.commission}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EarningsSummary;
