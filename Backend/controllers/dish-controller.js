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

const getDishes = async (req, res) => {
  try {
  
  const restaurantId = req.params.restaurantId;
  const menu = await Menu.findOne({ restaurant: restaurantId }).populate('dishes');

  if(!menu) return res.status(404).json({msg:"NO menu found"})
  res.status(200).json(menu.dishes);
}
  catch (error) {
    res.status(500).json({msg:"internal server error"})
  }
};

const updateDish = async (req,res) => {
  try {
    const dishId = req.params.dishId;
    const { name , description, price, image } = req.body;

    const updatedData = await Dish.findByIdAndUpdate(dishId,
      {
        name,description,price,image
      },
      { new : true}
    );
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({msg:"Internal server error"})
  }
}

const deleteDish = async(req,res) => {
  try {
    const dishId = req.params.dishId;
    const deletedDish = await Dish.findByIdAndDelete(
      dishId
    );

    if (!deletedDish) {
      return res.status(404).json({ msg: "Dish not found" });
    }

    res.status(200).json({msg:"dish deleted successfully"});
  } catch (error) {
    res.status(500).json({msg:"Internal server error"})
  }
}

module.exports = { createDish, getDishes , updateDish , deleteDish};
