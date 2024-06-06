const Restaurant = require("../models/Restaurant");

const createRestaurant = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const { restaurant_name, address, phone, cuisine, restaurant_img } =
      req.body;
    const newRestaurant = new Restaurant({
      restaurant_name,
      address,
      phone,
      cuisine,
      owner: ownerId,
      restaurant_img,
    });
    const savedRestaurant = await newRestaurant.save();
    res.status(200).json(savedRestaurant);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getRestaurant = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    if (!restaurants)
      return res.status(404).json({ msg: "No restaurnats found" });
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getRestaurantById = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant)
      return res.status(404).json({ msg: "no restaurant found" });

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const updateRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const { restaurant_name, address, phone, cuisine } = req.body;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      {
        $set: {
          restaurant_name,
          address,
          phone,
          cuisine,
          updatedAt: new Date(),
        },
      },
      { new: true }
    );
    if (!updatedRestaurant) {
      return res.status(404).json({ msg: "Restaurant not found" });
    }

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (!restaurant) {
      return res.status(404).send();
    }

    res.send(restaurant);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getRestaurantByCuisine = async (req, res) => {
  try {
    const { cuisine } = req.query;

    if (!cuisine) {
      return res.status(400).json({ msg: "Cuisine type is required" });
    }

    const restaurants = await Restaurant.find({ cuisine: cuisine });

    if (restaurants.length === 0) {
      return res
        .status(404)
        .json({ msg: "No restaurants found for this cuisine" });
    }

    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const searchRestaurant = async (req, res) => {
  try {
    const { searchKey } = req.query;
    const searchRegex = new RegExp(searchKey, "i");

    const restaurants = await Restaurant.find({ restaurant_name: searchRegex });
    // restaurants = restaurants.sort((a, b) => {
    //   if (a.review_rating > b.review_rating) return -1;
    //   if (a.review_rating < b.review_rating) return 1;
    //   return 0;
    // });

    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const restaurantsByLocation = async (req, res) => {
  try {
    const { longitude, latitude, page = 1, limit = 10 } = req.body;
    const skip = (page - 1) * limit;
    const restaurants = await Restaurant.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 25000,
        },
      },
    })
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      restaurants,
      currentPage: page,
      totalPages: Math.ceil(restaurants.length / limit),
    });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

module.exports = {
  createRestaurant,
  updateRestaurant,
  getRestaurant,
  deleteRestaurant,
  getRestaurantById,
  getRestaurantByCuisine,
  searchRestaurant,
  restaurantsByLocation,
};
