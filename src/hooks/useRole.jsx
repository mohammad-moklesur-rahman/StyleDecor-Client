import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [role, setRole] = useState(null);

  useEffect(() => {
    // wait until auth loading finished and user exists
    if (!authLoading && user?.email) {
      axiosSecure
        .get("/users/role")
        .then((res) => {
          setRole(res.data.role);
        })
        .catch((error) => {
          console.error("Failed to fetch role", error);
          setRole(null);
        });
    }
  }, [user?.email, authLoading, axiosSecure]);

  return { role };
};

export default useRole;
