const Menu = require("../models/Menu");
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

const updateMenu = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;

    const { offer } = req.body;

    const discountMatch = offer.match(/(\d+)%/);
    if (!discountMatch) {
      return res.status(400).json({ msg: "Invalid offer format" });
    }
    const discountPercentage = parseFloat(discountMatch[1]);
    const menu = await Menu.findOne({ restaurant: restaurantId }).populate(
      "dishes"
    );

    if (!menu) {
      return res.status(404).json({ msg: "No menu found for the restaurant" });
    }

    // Update each dish with the new price and offer
    for (const dish of menu.dishes) {
      const originalPrice = dish.price;
      const newPrice =
        originalPrice - originalPrice * (discountPercentage / 100);

      await Dish.updateOne(
        { _id: dish._id },
        {
          $set: {
            price: newPrice.toFixed(2),
          },
        }
      );
    }

    // Update the menu's offer
    menu.offer = offer;
    await menu.save();

    res.status(200).json({ msg: "offer applied sucessfully" });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const getDishes = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const menu = await Menu.findOne({ restaurant: restaurantId }).populate(
      "dishes"
    );

    if (!menu) return res.status(404).json({ msg: "NO menu found" });
    res.status(200).json(menu.dishes);
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const updateDish = async (req, res) => {
  try {
    const dishId = req.params.dishId;
    console.log(dishId);
    const updates = req.body;

    const updatedDish = await Dish.findByIdAndUpdate(dishId, updates, { new: true });

    if (!updatedDish) {
      return res.status(404).json({ msg: "Dish not found" });
    }

    res.status(200).json(updatedDish)
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const deleteDish = async (req, res) => {
  try {
    const dishId = req.params.dishId;
    const deletedDish = await Dish.findByIdAndDelete(dishId);

    if (!deletedDish) {
      return res.status(404).json({ msg: "Dish not found" });
    }

    await Menu.updateMany(
      { dishes: dishId },
      { $pull: { dishes: dishId } },
      { multi: true }
    );


    res.status(200).json({ msg: "dish deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const searchDish = async (req, res) => {
  try {
    const { searchKey } = req.query;
    const restaurantId = req.params.restaurantId;
    const searchRegex = new RegExp(searchKey, "i");

    const dishes = await Dish.find({
      name: searchRegex,
      restaurant: restaurantId,
    });
    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const menuPriceFilter = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const { sortOrder } = req.query;
    const menu = await Menu.findOne({ restaurant: restaurantId });

    const sortDishes = (a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price;
      } else if (sortOrder === "dsc") {
        return b.price - a.price;
      } else {
        throw new Error("invalid query it should be 'asc' or 'dsc'");
      }
    };

    const sortedDishes = menu.dishes.sort(sortDishes);

    res.status(200).json(sortedDishes);
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const bestSellerFilter = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const menu = await Menu.findOne({ restaurant: restaurantId });

    const dishes = menu.dishes.sort((a, b) => b.orderCount - a.orderCount);

    res.status(200).json(dishes);
  } catch (error) {
    res.status(500).json({ msg: "internal server error" }, { error });
  }
};

module.exports = {
  createDish,
  getDishes,
  updateDish,
  deleteDish,
  updateMenu,
  searchDish,
  bestSellerFilter,
  menuPriceFilter
};
