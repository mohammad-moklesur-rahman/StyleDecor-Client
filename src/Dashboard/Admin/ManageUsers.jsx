import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await axiosSecure.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const changeRole = async (userId, role) => {
    await axiosSecure.patch(`/users/role/${userId}`, { role });
    loadUsers();
  };

  return (
    <div className="w-full">

      {/* =======================
          MOBILE VIEW (Cards)
      ======================= */}
      <div className="grid gap-4 md:hidden">
        {users.map((user) => (
          <div
            key={user._id}
            className="card bg-base-100 shadow-md border"
          >
            <div className="card-body p-4">
              <h2 className="font-bold text-lg">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>

              <div className="mt-2">
                <span className="text-sm font-semibold">Current Role:</span>
                <span className="ml-2 badge badge-primary">
                  {user.role}
                </span>
              </div>

              <select
                value={user.role}
                onChange={(e) => changeRole(user._id, e.target.value)}
                className="select select-bordered w-full mt-3"
              >
                <option value="user">User</option>
                <option value="decorator">Decorator</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* =======================
          DESKTOP VIEW (Table)
      ======================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Change Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="font-bold capitalize">{user.role}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) =>
                      changeRole(user._id, e.target.value)
                    }
                    className="select select-bordered"
                  >
                    <option value="user">User</option>
                    <option value="decorator">Decorator</option>
                    <option value="admin">Admin</option>
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

export default ManageUsers;
