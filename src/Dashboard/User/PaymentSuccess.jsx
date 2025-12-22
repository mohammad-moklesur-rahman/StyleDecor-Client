import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecure();
  const [params] = useSearchParams();
  const session_id = params.get("session_id");

  const calledRef = useRef(false); //prevent multiple calls

  // When page loads → save payment in database
  useEffect(() => {
    if (session_id && !calledRef.current) {
      calledRef.current = true;

      axiosSecure.get(`/stripe/payment-info?session_id=${session_id}`);
    }
  }, [session_id, axiosSecure]);

  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-2 text-lg">Your booking is now paid.</p>
    </div>
  );
};

export default PaymentSuccess;
