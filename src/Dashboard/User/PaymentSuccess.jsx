import { useEffect, useRef } from "react";
import useAxios from "../../hooks/useAxios";
import { useSearchParams } from "react-router";

const PaymentSuccess = () => {
  const axios = useAxios();
  const [params] = useSearchParams();
  const session_id = params.get("session_id");

   const calledRef = useRef(false); //prevent multiple calls

  // When page loads → save payment in database
  useEffect(() => {
    if (session_id && !calledRef.current) {
      calledRef.current = true;

      axios.get(`/stripe/payment-info?session_id=${session_id}`);
    }
  }, [session_id, axios]);

  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful!</h1>
      <p className="mt-2 text-lg">Your booking is now paid.</p>
    </div>
  );
};

export default PaymentSuccess;
