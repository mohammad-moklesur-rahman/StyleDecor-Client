import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const RevenueChart = ({ payments }) => {
  const data = payments.map((p) => ({
    date: new Date(p.date).toLocaleDateString(),
    revenue: p.amount,
  }));

  return (
    <div className="bg-white shadow rounded p-5">
      <h2 className="text-xl font-semibold mb-4">Revenue Over Time</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line dataKey="revenue" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
