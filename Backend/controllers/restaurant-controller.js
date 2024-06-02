const Restaurant = require("../models/Restaurant");

const createRestaurant = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;
    const { restaurant_name, address, phone, cuisine } = req.body;
    const newRestaurant = new Restaurant({
      restaurant_name,
      address,
      phone,
      cuisine,
      owner: ownerId
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


const deleteRestaurant = async(req,res) => {
    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

        if (!restaurant) {
            return res.status(404).send();
        }

        res.send(restaurant);
    } catch (error) {
        res.status(500).json({msg:"Internal server error"})
    }
}

module.exports = { createRestaurant , updateRestaurant, getRestaurant , deleteRestaurant }