import useRole from "../hooks/useRole";
import RevenueMonitoring from "./Admin/RevenueMonitoring";
import EarningsSummary from "./Decorator/EarningsSummary";

const DashboardHome = () => {
  const { role } = useRole();
  return (
    <>
      {/* for User */}
      {role === "user" && (
        <>
          <h2 className="text-2xl text-green-500">Welcome!</h2>
        </>
      )}

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
