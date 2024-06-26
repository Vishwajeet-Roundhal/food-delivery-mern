import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { useContext } from "react";

function SingleRestaurant() {
  const params = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const [dishes, setDishes] = useState([]);


  const fetchRestaurant = async () => {
    try {
      const response = await fetch(
        `http://localhost:6005/api/restaurant/getRestaurantById/${params.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch restaurant");
      }
      const data = await response.json();
      setRestaurant(data);
    } catch (error) {
      console.error("Error fetching restaurant:", error.message);
    }
  };

  const fetchMenu = async () => {
    try {
      const res = await fetch(
        `http://localhost:6005/api/restaurant/getDishes/${params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      // Check if data is an array
      if (Array.isArray(data)) {
        setDishes(data);
      } else {
        setDishes([]);
        console.error("Fetched data is not an array:", data);
      }
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    fetchRestaurant();
    fetchMenu();
  }, [params.id]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Restaurant Details Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center mb-4">
            {restaurant.restaurant_name}
          </h2>
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img
              src={
                restaurant.restaurant_img.length > 0
                  ? restaurant.restaurant_img[0]
                  : "FrontEnd/src/Data/image-not-found-icon.png"
              }
              alt={restaurant.restaurant_name}
              className="w-full h-64 object-cover object-center"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">
                {restaurant.restaurant_name}
              </h3>
              <p className="text-gray-600 mb-2">{restaurant.address}</p>
              <p className="text-gray-600 mb-4">
                Cuisine: {restaurant.cuisine}
              </p>
            </div>
          </div>
        </div>

        <h2>Menu</h2>

        {/* Dishes Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(dishes) && dishes.length > 0 ? (
            dishes.map((dish) => (
              <div
                key={dish._id}
                className="bg-white rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={
                    dish.image_url ||
                    "FrontEnd/src/Data/image-not-found-icon.png"
                  }
                  alt={dish.name}
                  className="w-full h-48 object-cover object-center"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{dish.name}</h3>
                  <p className="text-gray-600 mb-2">Price: {dish.price}</p>
                  <p className="text-gray-600 mb-4">{dish.description}</p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => removeFromCart(dish)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      -
                    </button>
                    <span>
                      {cart.find((item) => item._id === dish._id)?.quantity ||
                        0}
                    </span>
                    <button
                      onClick={(e) => addToCart(dish)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No dishes available</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleRestaurant;
