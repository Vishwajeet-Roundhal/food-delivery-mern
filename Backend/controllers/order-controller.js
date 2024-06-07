const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");

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

const getAllOrders = async(req,res) => {
    try {
        const orders = await Order.find();
        if(!orders) return res.status(404).json({msg:"no orders found"})
        
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({msg:"internal server error"})
    }
}

const updateOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { status, paymentStatus } = req.body;

    const order = await Order.findById(orderId);

    order.status = status;
    order.paymentStauts = paymentStatus;

    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};



module.exports = { createOrder, getAllOrdersByUser , updateOrderById,getAllOrders };
