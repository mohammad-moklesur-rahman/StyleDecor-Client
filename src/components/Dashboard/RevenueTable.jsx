const RevenueTable = ({ payments }) => {
  return (
    <div className="bg-white shadow rounded p-4 sm:p-5">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Payment History</h2>

      {/* Scroll wrapper */}
      <div className="relative -mx-4 sm:mx-0 overflow-x-auto">
        <table className="min-w-[700px] w-full border-collapse border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 whitespace-nowrap">Transaction ID</th>
              <th className="border p-2 whitespace-nowrap">User Email</th>
              <th className="border p-2 whitespace-nowrap">Amount</th>
              <th className="border p-2 whitespace-nowrap">Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50">
                <td className="border p-2 whitespace-nowrap">
                  {p.transactionId.slice(0, 10)}...
                </td>
                <td className="border p-2 break-all">{p.userEmail}</td>
                <td className="border p-2 whitespace-nowrap">৳{p.amount}</td>
                <td className="border p-2 whitespace-nowrap">
                  {new Date(p.date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueTable;
