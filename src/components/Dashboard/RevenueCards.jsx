const RevenueCards = ({ payments }) => {
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalTransactions = payments.length;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white shadow rounded p-5">
        <h2 className="text-gray-500">Total Revenue</h2>
        <p className="text-2xl font-bold">৳{totalRevenue}</p>
      </div>

      <div className="bg-white shadow rounded p-5">
        <h2 className="text-gray-500">Total Transactions</h2>
        <p className="text-2xl font-bold">{totalTransactions}</p>
      </div>

      <div className="bg-white shadow rounded p-5">
        <h2 className="text-gray-500">Average Revenue</h2>
        <p className="text-2xl font-bold">
          ৳
          {totalTransactions
            ? (totalRevenue / totalTransactions).toFixed(2)
            : 0}
        </p>
      </div>
    </div>
  );
};

export default RevenueCards;
