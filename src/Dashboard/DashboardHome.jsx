import useRole from "../hooks/useRole";
import RevenueMonitoring from "./Admin/RevenueMonitoring";

const DashboardHome = () => {
  const { role } = useRole();
  return (
    <>
      {role === "admin" && (
        <>
          <RevenueMonitoring />
        </>
      )}
    </>
  );
};

export default DashboardHome;
