import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { useContext } from "react";

function SingleRestaurant() {
  const params = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState("");

  const [dishes, setDishes] = useState([]);
  const [rating, setRating] = useState(0);

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

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const submitReview = async () => {
    try {
      const response = await fetch(
        `http://localhost:6005/api/restaurant/addReview/${params.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rating }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to submit review");
      }
      // Optionally handle success scenario (e.g., show confirmation message)
    } catch (error) {
      console.error("Error submitting review:", error.message);
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
          <div className="relative">
            <img
              src={
                restaurant.restaurant_img.length > 0
                  ? restaurant.restaurant_img[0]
                  : "FrontEnd/src/Data/image-not-found-icon.png"
              }
              alt={restaurant.restaurant_name}
              className="w-full h-64 object-cover object-center rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4 rounded-lg">
              <h2 className="text-4xl font-bold mb-2">
                {restaurant.restaurant_name}
              </h2>
              <p className="text-lg mb-2 flex items-center">
                <i className="fas fa-map-marker-alt mr-2"></i>
                {restaurant.address}
              </p>
              <p className="text-lg flex items-center">
                <i className="fas fa-utensils mr-2"></i>
                Cuisine: {restaurant.cuisine}
              </p>
              <div className="mb-8 float-right ml-auto">
                <div className="flex items-center space-x-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      className={`text-2xl ${
                        star <= rating ? "text-yellow-500" : "text-gray-300"
                      } focus:outline-none`}
                      onClick={() => setRating(star)}
                    >
                      &#9733;
                    </button>
                  ))}
                </div>
                <button
                  onClick={submitReview}
                  className="bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-300 transition duration-300"
                >
                  add review
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Menu</h2>
          <div className="flex justify-center mb-6">
            <input
              type="text"
              id="menu-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in menu..."
              className="block w-full max-w-lg p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.length > 0 ? (
              filteredDishes.map((dish) => (
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
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">
                      {dish.name}
                    </h3>
                    <p className="text-gray-600 mb-2">Price: Rs {dish.price}</p>
                    <p className="text-gray-600 mb-4">{dish.description}</p>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => removeFromCart(dish)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                      >
                        -
                      </button>
                      <span className="text-gray-800 font-semibold">
                        {cart.find((item) => item._id === dish._id)?.quantity ||
                          0}
                      </span>
                      <button
                        onClick={() => addToCart(dish)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-600">No dishes available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleRestaurant;
