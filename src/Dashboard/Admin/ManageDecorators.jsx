import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageDecorators = () => {
  const axiosSecure = useAxiosSecure();
  const [decorators, setDecorators] = useState([]);

  useEffect(() => {
    axiosSecure.get("/decorators").then((res) => {
      setDecorators(res.data);
    });
  }, [axiosSecure]);

  const approve = async (id) => {
    await axiosSecure.patch(`/decorators/approve/${id}`);
    refresh();
  };

  const disable = async (id) => {
    await axiosSecure.patch(`/decorators/disable/${id}`);
    refresh();
  };

  const refresh = async () => {
    const res = await axiosSecure.get("/decorators");
    setDecorators(res.data);
  };

  return (
    <table className="table w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Availability</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {decorators.map((d) => (
          <tr key={d._id}>
            <td>{d.name}</td>
            <td>{d.email}</td>

            <td>
              <span
                className={
                  d.status === "approved"
                    ? "text-green-600"
                    : d.status === "pending"
                    ? "text-orange-500"
                    : "text-red-600"
                }
              >
                {d.status}
              </span>
            </td>

            <td>{d.isAvailable ? "Available" : "Unavailable"}</td>

            <td>
              {d.status === "pending" && (
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => approve(d._id)}
                >
                  Approve
                </button>
              )}

              {d.status === "approved" && (
                <button
                  className="btn btn-error btn-sm"
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
  );
};

export default ManageDecorators;
