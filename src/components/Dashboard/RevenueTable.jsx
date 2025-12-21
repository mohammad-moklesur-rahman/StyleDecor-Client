const RevenueTable = ({ payments }) => {
  return (
    <div className="bg-white shadow rounded p-5">
      <h2 className="text-xl font-semibold mb-4">Payment History</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Transaction ID</th>
            <th className="border p-2">User Email</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p._id}>
              <td className="border p-2">{p.transactionId.slice(0, 10)}...</td>
              <td className="border p-2">{p.userEmail}</td>
              <td className="border p-2">৳{p.amount}</td>
              <td className="border p-2">
                {new Date(p.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RevenueTable;
