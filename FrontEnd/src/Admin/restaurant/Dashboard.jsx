import React from 'react'
import { useState, useEffect } from 'react';

function Dashboard() {
  const [restaurant, setRestaurant] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const restaurantId = localStorage.getItem('RestaurantId');
  console.log(restaurantId);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(`http://localhost:6005/api/restaurant/getRestaurantById/${restaurantId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch restaurant');
        }
        const data = await response.json();
        setRestaurant(data); // Assuming data is a single restaurant object
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [restaurantId]); // Fetch data whenever restaurantId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!restaurant) {
    return <div>No restaurant found.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">{restaurant.restaurant_name}</h2>
      <div className="bg-white p-4 shadow-md rounded-lg">
        <p className="text-gray-600 mb-2">{restaurant.address}, {restaurant.city}</p>
        <p className="text-gray-600 mb-2">Phone: {restaurant.phone}</p>
        <p className="text-gray-600">Cuisine: {restaurant.cuisine}</p>
        {/* Add more details as needed */}
      </div>
    </div>
  );
}

export default Dashboard