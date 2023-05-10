import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

import CardIcon from "../images/credit-card.svg";
import ProductImage from "../images/product-image.jpg";

import "../styles.css";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  }

  return stripePromise;
};

const Checkout = () => {

  const [stripeError, setStripeError] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const item = {
    price: "price_1N67GdSG28aqCXC5CzRRtlAq",
    quantity: 1
  };

  const checkoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`
  };

  const redirectToCheckout = async () => {
    setLoading(true);
    console.log("redirectToCheckout");

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);

    if (error) setStripeError(error.message);
    setLoading(false);
  };

  if (stripeError) alert(stripeError);

  return (
    <div className="checkout">
      <h1>Stripe Checkout</h1>
      <p className="checkout-title">MERN STACK Development Bootcamp(2023)</p>
      <p className="checkout-description">
      The best ever course you only need to learn MERN stack development from scratch!
      </p>
      <h1 className="checkout-price">$30</h1>
      <img
        className="checkout-product-image"
        src={ProductImage}
        alt="Product"
      />
      <button
        className="checkout-button"
        onClick={redirectToCheckout}
        disabled={isLoading}
      >
        <div className="grey-circle">
          <div className="purple-circle">
            <img className="icon" src={CardIcon} alt="credit-card-icon" />
          </div>
        </div>
        <div className="text-container">
          <p className="text">{isLoading ? "Loading..." : "Buy"}</p>
        </div>
      </button>
    </div>
  );
};

export default Checkout;


// import { useState } from "react";
// import { loadStripe } from "@stripe/react-stripe-js";
// import { Elements} from "@stripe/react-stripe-js";
// import StripeCheckout from 'react-stripe-checkout';

// import CardIcon from "../images/credit-card.svg";
// import ProductImage from "../images/product-image.jpg";
// import Razorpay from "react-razorpay";

// import "../styles.css";

// const Checkout = () => {
//   const [stripeError, setStripeError] = useState(null);
//   const [isLoading, setLoading] = useState(false);
//   const [selectedGateway, setSelectedGateway] = useState(null);
//   const [showRazorpayModal, setShowRazorpayModal] = useState(false);
//   const [razorpayOrderId, setRazorpayOrderId] = useState(null);
//   const [razorpayKey, setRazorpayKey] = useState(process.env.REACT_APP_RAZORPAY_KEY);

//   const item = {
//     price: "price_1N67GdSG28aqCXC5CzRRtlAq",
//     quantity: 1
//   };

//   const checkoutOptions = {
//     lineItems: [item],
//     mode: "payment",
//     successUrl: `${window.location.origin}/success`,
//     cancelUrl: `${window.location.origin}/cancel`
//   };

//   const handleStripeCheckout = async () => {
//     setSelectedGateway("stripe");
//   };

//   const handleRazorpayCheckout = async () => {
//     const data = await fetch("/api/create-razorpay-order", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ amount: 3000 }) // amount in paisa
//     }).then((res) => res.json());

//     setRazorpayOrderId(data.id);

//     setShowRazorpayModal(true);
//   };

//   const handleRazorpayPaymentSuccess = () => {
//     alert("Payment successful!");
//   };

//   const handleRazorpayPaymentError = () => {
//     alert("Payment failed.");
//   };

//   const handleRazorpayPaymentClose = () => {
//     setShowRazorpayModal(false);
//   };

//   const handleStripePaymentSuccess = () => {
//     alert("Payment successful!");
//   };

//   const handleStripePaymentError = (error) => {
//     setStripeError(error.message);
//   };

//   const handleStripePaymentClose = () => {
//     setSelectedGateway(null);
//   };

//   if (stripeError) alert(stripeError);

//   return (
//     <div className="checkout">
//       <h1>Select Payment Gateway</h1>
//       <div className="payment-gateway-buttons">
//         <button className="checkout-button" onClick={handleStripeCheckout} disabled={isLoading}>
//           <div className="grey-circle">
//             <div className="purple-circle">
//               <img className="icon" src={CardIcon} alt="credit-card-icon" />
//             </div>
//           </div>
//           <div className="text-container">
//             <p className="text">{isLoading ? "Loading..." : "Pay with Stripe"}</p>
//           </div>
//         </button>
//         <button className="checkout-button" onClick={handleRazorpayCheckout} disabled={isLoading}>
//           <div className="grey-circle">
//             <div className="purple-circle">
//               <img className="icon" src={CardIcon} alt="credit-card-icon" />
//             </div>
//           </div>
//           <div className="text-container">
//             <p className="text">{isLoading ? "Loading...": "Pay with Razorpay"}</p>
//           </div>
//         </button>
//       </div>
//       {selectedGateway === "stripe" && (
//         <Elements stripe={loadStripe(process.env.REACT_APP_STRIPE_KEY)}>
//           <StripeCheckout
//             checkoutOptions={checkoutOptions}
//             handlePaymentSuccess={handleStripePaymentSuccess}
//             handlePaymentError={handleStripePaymentError}
//             handlePaymentClose={handleStripePaymentClose}
//           />
//         </Elements>
//       )}
//       {showRazorpayModal && (
//         <Razorpay
//           key={razorpayKey}
//           amount={3000} // amount in paisa
//           currency="INR"
//           order_id={razorpayOrderId}
//           name="MERN Stack Development Bootcamp"
//           description="The best ever course you only need to learn MERN stack development from scratch!"
//           image={ProductImage}
//           handler={handleRazorpayPaymentSuccess}
//           onpaymenterror={handleRazorpayPaymentError}
//           onclose={handleRazorpayPaymentClose}
//         />
//       )}
//     </div>
//   );
// };

// export default Checkout;