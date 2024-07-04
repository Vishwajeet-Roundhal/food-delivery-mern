import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import ProceedToCheckout from "./ProceedToCheckout";
function MyCart() {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const [userData, setUserData] = useState(null); // State for user data
  const [selectedAddress, setSelectedAddress] = useState(null); // State for selected address
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(cart)); 
  }, [cart]);

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
        if (data.addresses && data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]); // Set the first address as the default selected address
        }
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleAddressChange = (event) => {
    const addressIndex = event.target.value;
    setSelectedAddress(userData.addresses[addressIndex]);
  };

  return (
    <div className="max-w-5xl mx-auto bg-gray-100 rounded-lg shadow-md overflow-hidden">
      {/* Left Side: Account and Delivery Address Section */}
      <div className="bg-white p-6">
        <h2 className="text-2xl font-semibold mb-4">Account and Delivery Address</h2>
        {!loading && userData ? (
          <div className="border rounded-lg p-4 shadow-md">
            <h3 className="text-lg font-semibold">{userData.name}</h3>
            <p className="text-gray-600 mb-2">{userData.email}</p>
            <div>
              <label htmlFor="address" className="block text-gray-700 mb-2">Select Delivery Address:</label>
              <select
                id="address"
                value={userData.addresses.indexOf(selectedAddress)}
                onChange={handleAddressChange}
                className="block w-full p-2 border rounded-md"
              >
                {userData.addresses.map((address, index) => (
                  <option key={index} value={index}>{address}</option>
                ))}
              </select>
            </div>
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
        <ProceedToCheckout total={calculateSubtotal()} deliveryAddress={selectedAddress} />
      </div>
    </div>
  );
}

export default MyCart;