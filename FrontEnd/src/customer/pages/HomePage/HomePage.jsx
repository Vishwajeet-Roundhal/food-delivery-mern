import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  const getRestoData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:6005/api/restaurant/restaurants`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch restaurants");
      }
      const data = await response.json();
      setRestaurants((prevRestaurants) => [...prevRestaurants, ...data]);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching restaurants:", error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getRestoData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
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

  

  return (
    <div className="bg-gray-100 min-h-screen">
      <p>helo</p>
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Discover Restaurants
        </h2>
        <h2 className="text-2xl">filter</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <Link
              key={restaurant._id}
              className="bg-white rounded-lg overflow-hidden shadow-md"
              to={`/restaurant/${restaurant._id}`
              }
            >
              <img
                src={
                  restaurant.restaurant_img.length > 0
                    ? restaurant.restaurant_img[0]
                    : "FrontEnd/src/Data/image-not-found-icon.png"
                }
                alt={restaurant.restaurant_name}
                className="w-full h-48 object-cover object-center"
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
