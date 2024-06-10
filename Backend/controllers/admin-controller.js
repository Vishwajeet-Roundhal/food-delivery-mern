const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(404).json({ msg: "no users found" });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const delUser = await User.findByIdAndDelete(userId);
    if (!delUser)
      return res.status(200).json({ msg: "user could not deleted" });

    res.status(200).json({ msg: "user deleted" });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const restaurantReport = async (req, res) => {
  try {
    const orderCounts = await Order.aggregate([
      {
        $group: {
          _id: "$restaurant", 
          totalSales: { $sum: "$totalPrice" },
          orderCount: { $sum: 1 }, 
        },
      },
      {
        $lookup: {
          from: "restaurants", 
          localField: "_id",
          foreignField: "_id",
          as: "restaurantDetails",
        },
      },
      {
        $unwind: "$restaurantDetails",
      },
      {
        $project: {
          restaurant: "$restaurantDetails.restaurant_name",
          orderCount: 1,
          totalSales: 1
        },
      },
    ]);

    res.status(200).json(orderCounts);
  } catch (error) {
    res.status();
  }
};

module.exports = { getAllUsers, deleteUser };
