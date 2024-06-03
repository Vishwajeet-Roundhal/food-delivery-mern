const Menu = require('../models/Menu')
const Dish = require("../models/Dish");

const createDish = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    console.log(restaurantId);
    const { name, price, image, description } = req.body;
    const dish = new Dish({
      name,
      price,
      image,
      description,
      restaurant: restaurantId,
    });
    console.log(name);

    const savedDish = await dish.save();

    let menu = await Menu.findOne({ restaurant: restaurantId });

    if (!menu) {
      menu = new Menu({ restaurant: restaurantId });
      // Save the new menu
      await menu.save();
    }
    console.log(menu);

    menu.dishes.push(savedDish._id);

    await menu.save();

    res.status(201).json({ message: "Dish created successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const getDishes = async (req, res) => {};

module.exports = { createDish, getDishes };
