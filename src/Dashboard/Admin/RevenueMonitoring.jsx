import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import RevenueCards from "../../components/Dashboard/RevenueCards";
import RevenueChart from "../../components/Dashboard/RevenueChart";
import ServiceDemandChart from "../../components/Dashboard/ServiceDemandChart";
import RevenueTable from "../../components/Dashboard/RevenueTable";

const RevenueMonitoring = () => {
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axiosSecure.get("/stripe/payments").then((res) => {
      const paidPayments = res.data.filter((p) => p.status === "paid");
      setPayments(paidPayments);
    });
  }, [axiosSecure]);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Revenue Monitoring</h1>

      <RevenueCards payments={payments} />

      <div className="grid md:grid-cols-2 gap-6">
        <RevenueChart payments={payments} />
        <ServiceDemandChart payments={payments} />
      </div>

      <RevenueTable payments={payments} />
    </div>
  );
};

export default RevenueMonitoring;
