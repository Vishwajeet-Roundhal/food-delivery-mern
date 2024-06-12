const Review = require("../models/Review");
const { updateAverageRating } = require("./restaurant-controller");

const createReview = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const dishId = req.params.dishId;
    const userId = req.user._id;
    const { rating, comment } = req.body;
    const review = new Review({
      user: userId,
      restaurant: restaurantId,
      dish: dishId,
      rating,
      comment,
    });

    const savedReview = await review.save();
    await updateAverageRating(restaurantId)

    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllReviews = async(req,res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const reviews = await Review.find({restaurant: restaurantId});
    if(!reviews) return res.status(404).json("no reviews found")

    res.status(200).json(reviews)
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteReview = async(req,res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const review = await Review.findByIdAndDelete(restaurantId)
    await updateAverageRating(restaurantId)
    res.status(200).json(review)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = { createReview , getAllReviews , deleteReview}