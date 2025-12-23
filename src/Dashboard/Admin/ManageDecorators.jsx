import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageDecorators = () => {
  const axiosSecure = useAxiosSecure();
  const [decorators, setDecorators] = useState([]);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = async () => {
    const res = await axiosSecure.get("/decorators");
    setDecorators(res.data);
  };

  const approve = async (id) => {
    await axiosSecure.patch(`/decorators/approve/${id}`);
    refresh();
  };

  const disable = async (id) => {
    await axiosSecure.patch(`/decorators/disable/${id}`);
    refresh();
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-zebra min-w-[700px]">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Availability</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {decorators.map((d) => (
            <tr key={d._id}>
              <td>{d.name}</td>
              <td className="break-all">{d.email}</td>

              <td>
                <span
                  className={`font-semibold ${
                    d.status === "approved"
                      ? "text-green-600"
                      : d.status === "pending"
                      ? "text-orange-500"
                      : "text-red-600"
                  }`}
                >
                  {d.status}
                </span>
              </td>

              <td>
                {d.isAvailable ? (
                  <span className="badge badge-success">Available</span>
                ) : (
                  <span className="badge badge-error">Unavailable</span>
                )}
              </td>

              <td className="text-center">
                {d.status === "pending" && (
                  <button
                    className="btn btn-success btn-xs md:btn-sm"
                    onClick={() => approve(d._id)}
                  >
                    Approve
                  </button>
                )}

                {d.status === "approved" && (
                  <button
                    className="btn btn-error btn-xs md:btn-sm"
                    onClick={() => disable(d._id)}
                  >
                    Disable
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageDecorators;
