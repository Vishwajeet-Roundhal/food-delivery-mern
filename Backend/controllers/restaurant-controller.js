const { attachDistance } = require("../middleware/distance");
const Menu = require("../models/Menu");
const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");
const Review = require("../models/Review");

const createRestaurant = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const {
      restaurant_name,
      address,
      phone,
      cuisine,
      restaurant_img,
      city,
      latitude,
      longitude,
    } = req.body;
    const newRestaurant = new Restaurant({
      restaurant_name,
      address,
      phone,
      cuisine,
      owner: ownerId,
      restaurant_img,
      city,
      latitude,
      longitude,
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
    const {
      restaurant_name,
      address,
      phone,
      cuisine,
      review_rating,
      city,
      latitude,
      longitude,
    } = req.body;
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      {
        $set: {
          restaurant_name,
          address,
          phone,
          cuisine,
          updatedAt: new Date(),
          review_rating,
          city,
          latitude,
          longitude,
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
      return res.status(404).send({ msg: "no restaurant found or deleted" });
    }

    res.send(restaurant);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getRestaurantByCuisine = async (req, res) => {
  try {
    const { cuisine } = req.query;

    let restaurants;

    if (!cuisine) {
      return res.status(400).json({ msg: "Cuisine type is required" });
    }

    if (cuisine === "all") {
      // Return all restaurants if cuisine is an empty string
      restaurants = await Restaurant.find();
    } else {
      // Return restaurants that match the specified cuisine
      restaurants = await Restaurant.find({ cuisine: cuisine });
    }
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

const getRestaurantByCity = async (req, res) => {
  try {
    const { city, limit, sort } = req.query;
    if (!city) return res.status(404).json({ msg: "No city found" });

    let query = Restaurant.find({
      address: { $regex: city, $options: "i" },
    });

    if (limit) {
      query = query.limit(parseInt(limit, 10));
    }
    if (sort === 'rating') {
      query = query.sort({ review_rating: -1 }); // Sort descending by review_rating
    }

    const restaurants = await query.exec();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const getRestaurantByRating = async (req, res) => {
  try {
    const { rating } = req.query;

    if (!rating) {
      return res.status(400).json({ msg: "Rating query parameter is required" });
    }

    const restaurants = await Restaurant.find({ review_rating: { $gte: rating } }).sort({ review_rating: -1 });


    if (!restaurants || restaurants.length === 0) {
      return res.status(200).json({ msg: "No restaurants found" });
    }

    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ msg: "internal server errro" });
  }
};

const restaurantDistanceFromUser = async (req, res) => {
  try {
    const userCoords = { lat: req.query.lat, lon: req.query.lon };

    attachDistance(userCoords)(req, res, () => {
      res.status(200).json(req.restaurantsWithDistance);
    });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const updateAverageRating = async (restaurantId) => {
  try {
    const reviews = await Review.find({ restaurant: restaurantId });

    const totalRatings = reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    console.log(totalRatings);
    const avgRating = totalRatings / reviews.length;
    console.log(avgRating);

    await Restaurant.findByIdAndUpdate(restaurantId, {
      review_rating: avgRating,
    });

    return avgRating;
  } catch (error) {
    throw new Error("Error updating average rating: " + error.message);
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
  getRestaurantByCity,
  getRestaurantByRating,
  restaurantDistanceFromUser,
  updateAverageRating,
};
