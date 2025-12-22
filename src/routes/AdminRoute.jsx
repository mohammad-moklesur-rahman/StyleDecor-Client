import { Navigate } from "react-router";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { role, authLoading, roleLoading } = useRole();

  if (authLoading || roleLoading) {
    return <h2>Loading...</h2>;
  }

  if (role === "admin") {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default AdminRoute;
