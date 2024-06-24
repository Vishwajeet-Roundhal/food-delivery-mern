import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

function RestoForm() {
  const [formData, setFormData] = useState({
    restaurant_name: "",
    address: "",
    city: "",
    phone: "",
    cuisine: "",
    restaurant_img: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const userId = localStorage.getItem('userId');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:6005/api/restaurant/createRestaurant/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json(); // Parse response JSON
        const { _id } = data;
        localStorage.setItem('RestaurantId',_id);
        setSuccess("Restaurant added successfully!");
        setError("");
        // Reset form data
        setFormData({
          restaurant_name: "",
          address: "",
          city: "",
          phone: "",
          cuisine: "",
          restaurant_img: "",
        });

        navigate('/registerRestaurant/dashboard');
      } else {
        const data = await response.json();
        setError(data.msg || "Failed to add restaurant");
        setSuccess("");
      }
    } catch (error) {
      setError("Failed to add restaurant");
      setSuccess("");
    }
  };
  return (
    <div>
      <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Restaurant</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Restaurant Name
            </label>
            <input
              type="text"
              id="restaurant_name"
              name="restaurant_name"
              value={formData.restaurant_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="city"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="cuisine"
            >
              Cuisine
            </label>
            <input
              type="text"
              id="cuisine"
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="img"
            >
              Image URL
            </label>
            <input
              type="url"
              id="restaurant_img"
              name="restaurant_img"
              value={formData.restaurant_img}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RestoForm;
