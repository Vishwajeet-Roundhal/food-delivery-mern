const Order = require("../models/Order");
const DeliveryExecutive = require("../models/DeliveryExecutive");

const createDeliveryExecutive = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const deliveryExecutive = new DeliveryExecutive({
      name,
      phone,
    });
    const savedExecutive = await deliveryExecutive.save();
    res.status(200).json(savedExecutive);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const assignNearestDeliveryExecutive = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId).populate("restaurant");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const { latitude, longitude } = order.restaurant;

    const nearestExecutive = await DeliveryExecutive.findOne({
      status: "available",
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 5000,
        },
      },
    });

    if (!nearestExecutive) {
      return res
        .status(404)
        .json({ message: "No available delivery executive found nearby" });
    }

    order.deliveryExecutive = nearestExecutive._id;
    order.status = "In Progress";

    await order.save();

    nearestExecutive.status = "unavailable";
    nearestExecutive.deliverToUser = order.deliveryAddress;
    await nearestExecutive.save();

    res.status(200).json({
      message: "Nearest delivery executive assigned successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = { createDeliveryExecutive, assignNearestDeliveryExecutive };
