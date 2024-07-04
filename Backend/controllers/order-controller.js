const Order = require("../models/Order");
const { sendEmail } = require("../Utils/emailService");
const Dish = require("../models/Dish");
const mongoose = require("mongoose");

const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const restaurantId = req.params.restaurantId;

    const { totalPrice, deliveryAddress, items } = req.body;

    const newOrder = new Order({
      user: userId,
      restaurant: restaurantId,
      items: items,
      deliveryAddress: deliveryAddress,
      totalPrice: totalPrice,
    });

    const savedOrder = await newOrder.save();

    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ user: userId });

    if (!orders) return res.status(404).json({ msg: "no order found" });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders) return res.status(404).json({ msg: "no orders found" });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const updateOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { status, paymentStatus } = req.body;
    console.log(status);
    const order = await Order.findById(orderId).populate("user");
    order.status = status;
    console.log(order.status);
    order.paymentStatus = paymentStatus;
    console.log(order);

    await order.save();

    const userEmail = order.user.email;
    console.log(userEmail);

    const emailSubject = "Your Swiggy Order Status Update";
    const emailText = `
      Dear ${order.user.name},

      We wanted to inform you that the status of your order #${orderId} has been updated.

      Current Order Status: ${status}
      Payment Status: ${paymentStatus}

      Here are the details of your order:
      Items Ordered: ${order.items.join(", ")}
      Total Price: ₹${order.totalPrice}
      Delivery Address: ${order.deliveryAddress}

      Thank you for ordering with Swiggy. If you have any questions or need further assistance, please feel free to contact our support team.

      Best regards,
      The Swiggy Team
    `;

    // await sendEmail(userEmail, emailSubject, emailText);

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const getRestaurantAllOrders = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const orders = await Order.find({ restaurant: restaurantId });
    if (!orders) return res.status(500).json({ msg: "internal server error" });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const restaurantSales = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const orders = await Order.find({
      restaurant: restaurantId,
      paymentStatus: "paid",
    });

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ msg: "No sales data found for this restaurant" });
    }

    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);

    res.status(200).json({ totalSales });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "internal server error" });
  }
};

module.exports = {
  createOrder,
  getAllOrdersByUser,
  updateOrderById,
  getAllOrders,
  getRestaurantAllOrders,
  restaurantSales,
};
