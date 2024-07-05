import React from "react";
import { useState, useEffect } from "react";
import InputField from "../../customer/components/InputField";
import PrimaryButton from "../../customer/components/PrimaryButton";
import { Link } from "react-router-dom";

function Dashboard() {
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newDish, setNewDish] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
  });

  const [editDish, setEditDish] = useState(null);

  const restaurantId = localStorage.getItem("RestaurantId");
  console.log(restaurantId);
  // const fetchRestaurant = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:6005/api/restaurant/getRestaurantById/${restaurantId}`);
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch restaurant');
  //     }
  //     const data = await response.json();
  //     console.log(data);
  //     setRestaurant(data); // Assuming data is a single restaurant object
  //     setLoading(false);
  //   } catch (error) {
  //     setError(error.message);
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(
          `http://localhost:6005/api/restaurant/getRestaurantById/${restaurantId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch restaurant");
        }
        const data = await response.json();
        console.log(data);
        setRestaurant(data); // Assuming data is a single restaurant object
        setLoading(false);
        if (dishes && dishes._id) {
          fetchDishes();
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [restaurantId]); // Fetch data whenever restaurantId changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDish({
      ...newDish,
      [name]: value,
    });
  };

  const isAuth = localStorage.getItem("token");
  console.log(isAuth);

  const fetchDishes = async () => {
    try {
      const response = await fetch(
        `http://localhost:6005/api/restaurant/getDishes/${restaurantId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch dishes");
      }
      const data = await response.json();
      setDishes(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddDish = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:6005/api/restaurant/createDish/${restaurantId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isAuth}`,
          },
          body: JSON.stringify(newDish),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add dish");
      }

      // Clear the form fields after successful addition
      setNewDish({
        name: "",
        price: "",
        image: "",
        description: "",
      });

      // Refresh restaurant data to display updated dishes
      fetchDishes();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateDish = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:6005/api/restaurant/updateDish/${restaurantId}/${editDish._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isAuth}`,
          },
          body: JSON.stringify(editDish),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update dish");
      }

      setEditDish(null);
      fetchDishes();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteDish = async (dishId) => {
    try {
      const res = await fetch(
        `http://localhost:6005/api/restaurant/deleteDish/${restaurantId}/${dishId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${isAuth}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to delete dish");
      }

      fetchDishes();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditClick = (dish) => {
    setEditDish(dish);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditDish({
      ...editDish,
      [name]: value,
    });
  };

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
    <div className="max-w-3xl mx-auto">
      {/* Restaurant Details */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-3xl font-bold mb-4">
          {restaurant.restaurant_name}
        </h2>
        <div className="text-gray-600 mb-2">{`${restaurant.address}, ${restaurant.city}`}</div>
        <div className="text-gray-600 mb-2">Phone: {restaurant.phone}</div>
        <div className="text-gray-600">Cuisine: {restaurant.cuisine}</div>
      </div>
      <nav className="bg-gray-900 px-4 py-2">
        <ul className="flex space-x-4">
          <li>
            <Link to="/registerRestaurant/orders" className="text-gray-300 hover:text-white">
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/admin/contacts"
              className="text-gray-300 hover:text-white"
            >
              Sales Report
            </Link>
          </li>
        </ul>
      </nav>

      {/* Add Dish Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 mt-4">
        <h3 className="text-2xl font-semibold mb-4">Add Dish</h3>
        <form onSubmit={handleAddDish}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Dish Name"
              id="name"
              name="name"
              value={newDish.name}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Price"
              id="price"
              name="price"
              value={newDish.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <InputField
            label="Description"
            id="description"
            name="description"
            value={newDish.description}
            onChange={handleInputChange}
            required
          />
          <InputField
            label="Image URL"
            id="image"
            name="image"
            value={newDish.image}
            onChange={handleInputChange}
          />
          <div className="flex justify-end">
            <PrimaryButton type="submit">Add Dish</PrimaryButton>
          </div>
        </form>
      </div>

      {/* Display Dishes */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Your Dishes</h3>
        <button onClick={fetchDishes} className="btn btn-secondary mb-4">
          Get Dishes
        </button>
        {dishes && dishes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dishes.map((dish) => (
              <div
                key={dish._id}
                className="bg-white p-6 rounded-lg shadow-md mb-4"
              >
                <h4 className="text-xl font-semibold mb-2">{dish.name}</h4>
                <p className="text-gray-600 mb-2">{dish.description}</p>
                <p className="text-gray-600">Price: {dish.price}</p>
                <div className="flex justify-end mt-4 space-x-4">
                  <button
                    onClick={() => handleEditClick(dish)}
                    className="btn btn-link"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteDish(dish._id)}
                    className="btn btn-link text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-600">No dishes found.</div>
        )}
      </div>

      {/* Edit Dish Form */}
      {editDish && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-2xl font-semibold mb-4">Edit Dish</h3>
          <form onSubmit={handleUpdateDish}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Dish Name"
                id="editName"
                name="name"
                value={editDish.name}
                onChange={handleEditInputChange}
                required
              />
              <InputField
                label="Price"
                id="editPrice"
                name="price"
                value={editDish.price}
                onChange={handleEditInputChange}
                required
              />
            </div>
            <InputField
              label="Description"
              id="editDescription"
              name="description"
              value={editDish.description}
              onChange={handleEditInputChange}
              required
            />
            <InputField
              label="Image URL"
              id="editImage"
              name="image"
              value={editDish.image}
              onChange={handleEditInputChange}
            />
            <div className="flex justify-end">
              <PrimaryButton type="submit">Update Dish</PrimaryButton>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
