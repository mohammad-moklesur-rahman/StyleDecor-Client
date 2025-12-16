import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const ManageUsers = () => {
  const axios = useAxios();
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const res = await axios.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const changeRole = async (userId, role) => {
    await axios.patch(`/users/role/${userId}`, { role });
    loadUsers();
  };

  return (
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
            <td className="font-bold">{user.role}</td>

            <td>
              <select
                value={user.role}
                onChange={(e) => changeRole(user._id, e.target.value)}
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
  );
};

export default ManageUsers;
