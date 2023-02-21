import { useCallback } from "react";
import useRazorpay from "react-razorpay";

export default function PaymentIn() {
  const Razorpay = useRazorpay();

  const handlePayment = useCallback(() => {
    // const order = createOrder(params);

    const options = {
      key: "rzp_test_DNRPX5gKBGGKKe",
      amount: "3000",
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "sdsd",
      order_id: "123",
      handler: (res) => {
        console.log(res);
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  return (
    <div className="App">
      <button onClick={handlePayment}>Click</button>
    </div>
  );
}
