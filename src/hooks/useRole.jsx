import { useEffect, useState } from "react";
import useAuth from "./UseAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && user?.email) {
      setRoleLoading(true);

      axiosSecure
        .get("/users/role")
        .then((res) => {
          setRole(res.data.role);
        })
        .catch(() => {
          setRole(null);
        })
        .finally(() => {
          setRoleLoading(false);
        });
    }
  }, [user?.email, authLoading, axiosSecure]);

  return { role, authLoading, roleLoading };
};

export default useRole;
