import React, { useState, useEffect } from 'react';

function RestaurantOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dishNames, setDishNames] = useState({});


  const restaurantId = localStorage.getItem('RestaurantId');

  // Function to fetch orders by restaurant ID
  const fetchOrdersByRestaurant = async () => {
    try {
      const response = await fetch(`http://localhost:6005/api/restaurant/getOrdersByRestaurant/${restaurantId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDishNames = async () => {
      try {
        const response = await fetch('http://localhost:6005/api/restaurant/getAllDishes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const dishes = await response.json();
          const dishNameMap = {};
          dishes.forEach((dish) => {
            dishNameMap[dish._id] = dish.name;
          });
          setDishNames(dishNameMap);
        } else {
          console.error('Failed to fetch dishes:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    fetchDishNames();
  }, []);


  useEffect(() => {
    fetchOrdersByRestaurant(restaurantId);
  }, [restaurantId]);

  return (
    <div className="container mx-auto">
    <h1 className="text-2xl font-bold mb-4">Restaurant Orders</h1>
    {loading ? (
      <p>Loading orders...</p>
    ) : error ? (
      <p>Error: {error}</p>
    ) : orders.length === 0 ? (
      <p>No orders found.</p>
    ) : (
      <div>
        {orders.map(order => (
          <div key={order._id} className="bg-white p-4 shadow-md rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-2">Order ID: {order._id}</h3>
            <p className="text-gray-600 mb-2">Customer: {order.user.name}</p>
            <p className="list-disc ml-6">
                {order.items.map((itemId, index) => (
                  <p key={index}>Dish Name: {dishNames[itemId] || 'Unknown Dish'}</p>
                ))}
              </p>
            <p className="text-gray-600 mb-2">Total Price: Rs {order.totalPrice.toFixed(2)}</p>
            <p className="text-gray-600 mb-2">Delivery Address: {order.deliveryAddress}</p>
            <p className="text-gray-600 mb-2">Payment Status: {order.paymentStatus}</p>
            <p className="text-gray-600 mb-2">Order Status: {order.status}</p>
            {/* {order.deliveryExecutive && (
              <p className="text-gray-600 mb-2">Delivery Executive: {order.deliveryExecutive.name}</p>
            )} */}
            <p className="text-gray-600">Date: {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    )}
  </div>
  );
}

export default RestaurantOrders;
