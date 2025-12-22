import { Navigate } from "react-router";
import useRole from "../hooks/useRole";

const DecoratorRoute = ({ children }) => {
  const { role, authLoading, roleLoading } = useRole();

  if (authLoading || roleLoading) {
    return <h2>Loading...</h2>;
  }

  if (role === "decorator") {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default DecoratorRoute;
