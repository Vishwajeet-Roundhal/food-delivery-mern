import React, { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dishNames, setDishNames] = useState({});

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:6005/api/restaurant/getAllOrdersByUser', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
          setLoading(false);
        } else {
          console.error('Failed to fetch orders:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [token]);

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

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto bg-gray-100 rounded-lg shadow-md overflow-hidden">
      <h2 className="text-2xl font-semibold bg-white p-6">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-center p-4">No orders found.</p>
      ) : (
        <div className="bg-white p-6">
          {orders.map((order) => (
            <div key={order._id} className="border rounded-lg p-4 shadow-md mb-4">
              <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
              <p className="text-gray-600">Total Price: Rs {order.totalPrice}</p>
              <p className="text-gray-600">Delivery Address: {order.deliveryAddress}</p>
              <p className="text-gray-600">Payment Status: {order.paymentStatus}</p>
              <p className="text-gray-600">Status: {order.status}</p>
              <h4 className="text-lg font-semibold mt-2">Items:</h4>
              <ul className="list-disc ml-6">
                {order.items.map((itemId, index) => (
                  <li key={index}>Dish Name: {dishNames[itemId] || 'Unknown Dish'}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
