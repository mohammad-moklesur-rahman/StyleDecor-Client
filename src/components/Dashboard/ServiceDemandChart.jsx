import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ServiceDemandChart = ({ payments }) => {
  const data = payments.map((p) => ({
    bookingId: p.bookingId.slice(-4),
    count: 1,
  }));

  return (
    <div className="bg-white shadow rounded p-5">
      <h2 className="text-xl font-semibold mb-4">Service Demand (Bookings)</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="bookingId" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ServiceDemandChart;
