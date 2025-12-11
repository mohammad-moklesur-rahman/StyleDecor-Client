import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { motion as Motion } from "framer-motion";
import useAuth from "../../hooks/UseAuth";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/stripe/payment-history?email=${user.email}`)
      .then((res) => {
        setPayments(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axios]);

  return (
    <div className="w-full px-5 py-10">
      <Motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-center"
      >
        Payment History
      </Motion.h1>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-20 text-lg font-semibold">
          Loading payments...
        </div>
      )}

      {/* Empty State */}
      {!loading && payments.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-2xl font-semibold">No Payment Records</h3>
          <p className="text-gray-500">
            Your payment history will appear here.
          </p>
        </div>
      )}

      {/* Payment Table */}
      {!loading && payments.length > 0 && (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
          <table className="table w-full">
            {/* Table Head */}
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Booking ID</th>
                <th>Amount (BDT)</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {payments.map((pay, index) => (
                <Motion.tr
                  key={pay._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <th>{index + 1}</th>
                  <td className="font-mono text-blue-500">
                    {pay.transactionId}
                  </td>
                  <td>{pay.bookingId}</td>
                  <td className="font-semibold">{pay.amount} BDT</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        pay.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {pay.status.toUpperCase()}
                    </span>
                  </td>

                  <td>{new Date(pay.date).toLocaleDateString()}</td>
                </Motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
