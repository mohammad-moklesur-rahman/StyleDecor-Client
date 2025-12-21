import useRole from "../hooks/useRole";
import RevenueMonitoring from "./Admin/RevenueMonitoring";
import EarningsSummary from "./Decorator/EarningsSummary";

const DashboardHome = () => {
  const { role } = useRole();
  return (
    <>
      {/* for Decorator */}
      {role === "decorator" && (
        <>
          <EarningsSummary />
        </>
      )}

      {/* for Admin */}
      {role === "admin" && (
        <>
          <RevenueMonitoring />
        </>
      )}
    </>
  );
};

export default DashboardHome;
