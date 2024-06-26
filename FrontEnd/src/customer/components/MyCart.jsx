import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

function MyCart() {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const [userData, setUserData] = useState(null); // State for user data
  const [loading, setLoading] = useState(true);

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const userId = localStorage.getItem("userId");

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:6005/api/auth/getUserById/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="max-w-5xl mx-auto bg-gray-100 rounded-lg shadow-md overflow-hidden">
    {/* Left Side: Account and Delivery Address Section */}
    <div className="bg-white p-6">
      <h2 className="text-2xl font-semibold mb-4">Account and Delivery Address</h2>
      {!loading && userData ? (
        <div className="border rounded-lg p-4 shadow-md">
          <h3 className="text-lg font-semibold">{userData.name}</h3>
          <p className="text-gray-600 mb-2">{userData.email}</p>
          <p className="text-gray-600">{userData.address}</p>
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-gray-600">Loading user data...</p>
        </div>
      )}
    </div>

    {/* Right Side: Cart Items Section */}
    <div className="bg-white p-6">
      <h2 className="text-2xl font-semibold mb-4">My Cart</h2>
      {cart.map((item, index) => (
        <div key={index} className="flex items-center justify-between border-b mb-4 pb-4">
          <div className="flex items-center space-x-4">
            <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
            <div>
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">Price: Rs {item.price}</p>
              <div className="flex items-center space-x-2 mt-1">
                <button
                  onClick={() => removeFromCart(item)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  -
                </button>
                <span className="text-xl">{item.quantity}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-600">Subtotal: Rs {item.price * item.quantity}</p>
          </div>
        </div>
      ))}
      <div className="mt-6 text-right">
        <h3 className="text-2xl font-bold">Total: Rs {calculateSubtotal()}</h3>
        <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600">
          Proceed to Checkout
        </button>
      </div>
    </div>
  </div>
  );
}

export default MyCart;
