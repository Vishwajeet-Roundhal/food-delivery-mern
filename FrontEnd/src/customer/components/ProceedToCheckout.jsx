// src/components/ProceedToCheckout.js

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom"; // Import the Link component from react-router-dom
import { CartContext } from "../../Context/CartContext";

function ProceedToCheckout({ total, deliveryAddress }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const { clearCart } = useContext(CartContext);

  const handleCheckout = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const user = localStorage.getItem("userId");
      const cartItems = JSON.parse(localStorage.getItem("myCart"));
      const token = localStorage.getItem("token");
      const restaurantId = cartItems[0]?.restaurant; 

      const response = await fetch(`http://localhost:6005/api/restaurant/createOrder/${restaurantId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          user,
          totalPrice: total,
          items: cartItems,
          deliveryAddress: deliveryAddress ? deliveryAddress : "No address",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to process order. Please try again.");
      }

      const data = await response.json();
      console.log("Order successfully created:", data);

      // Clear the cart after successful checkout
      clearCart();
      localStorage.removeItem("myCart");

      setCheckoutSuccess(true);
    } catch (error) {
      console.error("Checkout error:", error);
      setError("Failed to process order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mt-6 text-right">
      <h3 className="text-2xl font-bold">Total: Rs {total}</h3>
      {checkoutSuccess ? (
        <Link to="/orders" className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
          Go to Orders
        </Link>
      ) : (
        <button
          onClick={handleCheckout}
          className={`mt-4 px-6 py-3 rounded-lg shadow-md text-white ${
            isProcessing ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay now"}
        </button>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default ProceedToCheckout;
