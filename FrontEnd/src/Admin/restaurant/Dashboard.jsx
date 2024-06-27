import React from 'react'
import { useState, useEffect } from 'react';

function Dashboard() {
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newDish, setNewDish] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
  });

  const [editDish, setEditDish] = useState(null);


  const restaurantId = localStorage.getItem('RestaurantId');
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
        const response = await fetch(`http://localhost:6005/api/restaurant/getRestaurantById/${restaurantId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch restaurant');
        }
        const data = await response.json();
        console.log(data);
        setRestaurant(data); // Assuming data is a single restaurant object
        setLoading(false);
        if(dishes && dishes._id){
          fetchDishes()
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

  const isAuth = localStorage.getItem('token');
  console.log(isAuth);

  const fetchDishes = async () => {
    try {
      const response = await fetch(`http://localhost:6005/api/restaurant/getDishes/${restaurantId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch dishes');
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
      const response = await fetch(`http://localhost:6005/api/restaurant/createDish/${restaurantId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         Authorization: `Bearer ${isAuth}`
        },
        body: JSON.stringify(newDish),
      });

      if (!response.ok) {
        throw new Error('Failed to add dish');
      }

      // Clear the form fields after successful addition
      setNewDish({
        name: '',
        price: '',
        image: '',
        description: '',
      });

      // Refresh restaurant data to display updated dishes
      fetchDishes();

    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateDish = async(e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:6005/api/restaurant/updateDish/${restaurantId}/${editDish._id}`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${isAuth}`
        },
        body: JSON.stringify(editDish)
      });

      if (!res.ok) {
        throw new Error('Failed to update dish');
      }

      setEditDish(null);
      fetchDishes();
      
    } catch (error) {
      setError(error.message);

    }
  }

  const handleDeleteDish = async(dishId) => {
    try {
      const res = await fetch(`http://localhost:6005/api/restaurant/deleteDish/${restaurantId}/${dishId}`,{
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${isAuth}`
        },
      });
      if (!res.ok) {
        throw new Error('Failed to delete dish');
      }

      fetchDishes();
    } catch (error) {
      setError(error.message);
    }
  }

  const handleEditClick = (dish) => {
    setEditDish(dish);
  }

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
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">{restaurant.restaurant_name}</h2>
      <div className="bg-white p-4 shadow-md rounded-lg">
        <p className="text-gray-600 mb-2">{restaurant.address}, {restaurant.city}</p>
        <p className="text-gray-600 mb-2">Phone: {restaurant.phone}</p>
        <p className="text-gray-600">Cuisine: {restaurant.cuisine}</p>
        {/* Add more details as needed */}
      </div>

       {/* Add Dish Form */}
       <div className="bg-white p-4 shadow-md rounded-lg mb-4">
        <h3 className="text-lg font-semibold mb-2">Add Dish</h3>
        <form onSubmit={handleAddDish}>
          <div className="mb-2">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-1">Dish Name</label>
            <input type="text" id="name" name="name" value={newDish.name} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" required />
          </div>
          <div className="mb-2">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-1">Description</label>
            <textarea id="description" name="description" value={newDish.description} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" required></textarea>
          </div>
          <div className="mb-2">
            <label htmlFor="price" className="block text-gray-700 font-bold mb-1">Price</label>
            <input type="text" id="price" name="price" value={newDish.price} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" required />
          </div>
          <div className="mb-2">
            <label htmlFor="image" className="block text-gray-700 font-bold mb-1">Image URL</label>
            <input type="text" id="image" name="image" value={newDish.image} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Dish</button>
          </div>
        </form>
      </div>

      {/* Display Dishes */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Your dishes</h3>           
        <button onClick={fetchDishes}>Get Dishes</button>
        {dishes && dishes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dishes.map(dish => (
              <div key={dish._id} className="bg-white p-4 shadow-md rounded-lg">
                <h4 className="text-lg font-semibold mb-2">{dish.name}</h4>
                <p className="text-gray-600 mb-2">{dish.description}</p>
                <p className="text-gray-600">Price: {dish.price}</p>
                <button onClick={() => handleEditClick(dish)} className="text-blue-500 hover:underline p-4">Edit</button>
                <button onClick={() => handleDeleteDish(dish._id) } className="text-red-500 hover:underline p-4">Delete</button> 
              </div>
            ))}
          </div>
        ) : (
          <div>No dishes found.</div>
        )}
      </div>

      {editDish && (
        <div className="bg-white p-4 shadow-md rounded-lg mb-4">
          <h3 className="text-lg font-semibold mb-2">Edit Dish</h3> 
          <form onSubmit={handleUpdateDish}>
            <div className="mb-2">
              <label htmlFor="editName" className="block text-gray-700 font-bold mb-1">Dish Name</label>
              <input type="text" id="editName" name="name" value={editDish.name} onChange={handleEditInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" required />
            </div>
            <div className="mb-2">
              <label htmlFor="editDescription" className="block text-gray-700 font-bold mb-1">Description</label>
              <textarea id="editDescription" name="description" value={editDish.description} onChange={handleEditInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" required></textarea>
            </div>
            <div className="mb-2">
              <label htmlFor="editPrice" className="block text-gray-700 font-bold mb-1">Price</label>
              <input type="text" id="editPrice" name="price" value={editDish.price} onChange={handleEditInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" required />
            </div>
            <div className="mb-2">
              <label htmlFor="editImage" className="block text-gray-700 font-bold mb-1">Image URL</label>
              <input type="text" id="editImage" name="image" value={editDish.image} onChange={handleEditInputChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" />
            </div>
            <div className="flex items-center justify-between">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update Dish</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Dashboard