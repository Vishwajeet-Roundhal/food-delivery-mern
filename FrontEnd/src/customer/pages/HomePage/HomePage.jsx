import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import  Modal  from "react-modal";

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const [showFilter, setShowFilter] = useState(false); // State for filter visibility

  

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
  }, []);

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

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">
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
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              maxWidth: '80%',
              maxHeight: '80%',
              overflow: 'auto',
              zIndex: 1000
            },
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999
            }
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
              <select className="block w-full p-2 border border-gray-300 rounded-md">
                <option value="">All Cuisines</option>
                <option value="italian">Italian</option>
                <option value="indian">Indian</option>
                <option value="chinese">Chinese</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating:
              </label>
              <select className="block w-full p-2 border border-gray-300 rounded-md">
                <option value="">Any Rating</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars & above</option>
                <option value="3">3 Stars & above</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort By:
              </label>
              <select className="block w-full p-2 border border-gray-300 rounded-md">
                <option value="rating-desc">Rating Descending</option>
                <option value="rating-asc">Rating Ascending</option>
                <option value="price-desc">Higher price</option>
                <option value="price-asc">Lower price</option>
              </select>
            </div>
          </div>
        </Modal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <Link
              key={restaurant._id}
              className="bg-white rounded-lg overflow-hidden shadow-md"
              to={`/restaurant/${restaurant._id}`}
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
