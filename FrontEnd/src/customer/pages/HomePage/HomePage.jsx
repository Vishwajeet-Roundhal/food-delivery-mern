import React, { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { UserContext } from "../../../Context/UserContext";

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const [showFilter, setShowFilter] = useState(false);
  const [cuisine, setCuisine] = useState(null);
  const [rating, setRating] = useState(null);
  const [cityRestaurant, setCityRestaurant] = useState([]);
  // const [distance,setDistance] = useState("");

  const { locData } = useContext(UserContext);

  const getRestoData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:6005/api/restaurant/restaurantFromUser/?lat=${locData.latitude}&lon=${locData.longitude}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch restaurants");
      }
      const data = await response.json();
      // setRestaurants((prevRestaurants) => [...prevRestaurants, ...data]);
      setRestaurants(data);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching restaurants:", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0.2,
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      getRestoData();
    }
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  const fetchRestaurantByCuisine = async (cuisine) => {
    try {
      const res = await fetch(
        `http://localhost:6005/api/restaurant/getRestaurantByCuisine?cuisine=${cuisine}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setRestaurants(data);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error.message);
    }
  };

  const fetchRestaurantByRating = async (rating) => {
    try {
      const res = await fetch(
        `http://localhost:6005/api/restaurant/getRestaurantByRating?rating=${rating}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        console.log("Data received:", data);
        // Ensure data is an array
        if (Array.isArray(data)) {
          setRestaurants(data);
        } else {
          console.error("Expected array but got:", data);
          setRestaurants([]);
        }
      } else {
        console.error("Error fetching restaurants:", res.statusText);
        setRestaurants([]);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error.message);
    }
  };

  const calculateTravelTime = (distance, speed = 25) => {
    const time = distance / speed;
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    return `${hours}h ${minutes}m`;
  };

  const fetchRestaurantByCity = async () => {
    try {
      const res = await fetch(
        `http://localhost:6005/api/restaurant/getRestaurantByCity?city=${locData.city}&limit=3&sort=rating`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        setCityRestaurant(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(restaurants);

  useEffect(() => {
    getRestoData();
    // restaurantFromUser();
  }, []);

  useEffect(() => {
    if (cuisine) {
      fetchRestaurantByCuisine(cuisine);
    }
  }, [cuisine]);

  useEffect(() => {
    if (locData.city) {
      fetchRestaurantByCity();
    }
  }, [locData.city]);

  useEffect(() => {
    if (rating) {
      fetchRestaurantByRating(rating);
    }
  }, [rating]);


  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-left mb-3">
          Top Restaurants in {locData.city}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
          {cityRestaurant.map((restaurant) => (
            <Link
              key={restaurant._id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
              to={{
                pathname: `/restaurant/${restaurant._id}`,
                state: { distance: restaurant.distance }
              }}
            >
              {/* Restaurant Image */}
              <div className="relative">
                <img
                  src={
                    restaurant.restaurant_img.length > 0
                      ? restaurant.restaurant_img[0]
                      : "/path/to/default-image.jpg" // Replace with your default image path
                  }
                  alt={restaurant.restaurant_name}
                  className="w-full h-56 object-cover object-center rounded-t-lg"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 hover:opacity-0 transition-opacity duration-300"></div>
                {/* Restaurant Name on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-lg font-semibold text-center">
                    {restaurant.restaurant_name}
                  </span>
                </div>
              </div>
              {/* Restaurant Details */}
              <div className="p-4">
                <p className="text-xl text-gray-800 font-semibold mb-2">
                  {restaurant.restaurant_name}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  {restaurant.address}
                </p>
                {/* Distance and Delivery */}
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <p className="mr-2">
                    Distance:{" "}
                    {restaurant.distance
                      ? `${restaurant.distance.toFixed(2)} km`
                      : "N/A"}
                  </p>
                  <p>
                    Estimated Delivery:{" "}
                    {restaurant.distance
                      ? calculateTravelTime(restaurant.distance)
                      : "N/A"}
                  </p>
                </div>
                {/* Cuisine and Rating */}
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <p>
                    Cuisine: {restaurant.cuisine}
                    <span className="ml-2 text-blue-500">
                      Rating: {restaurant.review_rating}
                    </span>
                  </p>
                </div>
                {/* View Details Button */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    View Details
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-600 hover:text-gray-800 transition duration-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.707 9.293a1 1 0 00-1.414-1.414L7 10.586V7a1 1 0 10-2 0v4a1 1 0 001 1h4a1 1 0 000-2h-2.293l2.707-2.707a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <h2 className="text-3xl font-bold text-center mb-8 mt-3">
          Discover Restaurants
        </h2>
        <div className="mb-4 text-left text-lg">
          <button
            onClick={toggleFilter}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Filter
          </button>
        </div>
        <Modal
          isOpen={showFilter}
          onRequestClose={toggleFilter}
          style={{
            content: {
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "100%",
              maxHeight: "100%",
              overflow: "auto",
              zIndex: 1000,
            },
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
            },
          }}
          ariaHideApp={false}
        >
          <div className="bg-white p-4 shadow-md rounded-md mb-4">
            <h3 className="text-lg font-semibold mb-2">Filter Options</h3>
            {/* Example filter options */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cuisine:
              </label>
              <select
                className="block w-full p-2 border border-gray-300 rounded-md"
                value={cuisine || ""}
                onChange={(e) => setCuisine(e.target.value)}
              >
                <option value="all">ALl</option>
                <option value="indian">Indian</option>
                <option value="French">French</option>
                <option value="chinese">Chinese</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating:
              </label>
              <select
                className="block w-full p-2 border border-gray-300 rounded-md"
                value={rating || ""}
                onChange={(e) => setRating(e.target.value)}
              >
                <option value="4.5">5 Stars</option>
                <option value="4">4 Stars & above</option>
                <option value="3">3 Stars & above</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort By:
              </label>
              <select
                className="block w-full p-2 border border-gray-300 rounded-md"
                onChange={(e) => {
                  const selectedVal = e.target.value;
                  if (selectedVal === "1") {
                    fetchRestaurantByRating(1);
                  } else if (selectedVal === "time") {
                    // fetchRestaurantByTime();
                  }
                }}
              >
                <option value="1">Rating </option>
                <option value="time">Delivery Time</option>
              </select>
            </div>
          </div>
        </Modal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <Link
              key={restaurant._id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300"
              to={{
                pathname: `/restaurant/${restaurant._id}`,
                state: { distance: restaurant.distance }
              }}
            >
              {/* Restaurant Image */}
              <div className="relative">
                <img
                  src={
                    restaurant.restaurant_img.length > 0
                      ? restaurant.restaurant_img[0]
                      : "/path/to/default-image.jpg" // Replace with your default image path
                  }
                  alt={restaurant.restaurant_name}
                  className="w-full h-56 object-cover object-center rounded-t-lg"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 hover:opacity-0 transition-opacity duration-300"></div>
                {/* Restaurant Name on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-lg font-semibold text-center">
                    {restaurant.restaurant_name}
                  </span>
                </div>
              </div>
              {/* Restaurant Details */}
              <div className="p-4">
                <p className="text-xl text-gray-800 font-semibold mb-2">
                  {restaurant.restaurant_name}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  {restaurant.address}
                </p>
                {/* Distance and Delivery */}
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <p className="mr-2">
                    Distance:{" "}
                    {restaurant.distance
                      ? `${restaurant.distance.toFixed(2)} km`
                      : "N/A"}
                  </p>
                  <p>
                    Estimated Delivery:{" "}
                    {restaurant.distance
                      ? calculateTravelTime(restaurant.distance)
                      : "N/A"}
                  </p>
                </div>
                {/* Cuisine and Rating */}
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <p>
                    Cuisine: {restaurant.cuisine}
                    <span className="ml-2 text-blue-500">
                      Rating: {restaurant.review_rating}
                    </span>
                  </p>
                </div>
                {/* View Details Button */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    View Details
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-600 hover:text-gray-800 transition duration-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.707 9.293a1 1 0 00-1.414-1.414L7 10.586V7a1 1 0 10-2 0v4a1 1 0 001 1h4a1 1 0 000-2h-2.293l2.707-2.707a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* {loading && <p className="text-center mt-4">Loading...</p>} */}
        {/* <div ref={loader} className="mt-4"></div> */}
      </div>
    </div>
  );
};

export default HomePage;
