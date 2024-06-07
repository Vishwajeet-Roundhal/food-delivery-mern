const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    items: [{ type: String , required: true }],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Delivered', 'Cancelled'], default: 'Pending' },
    deliveryAddress: { type: String, required: true},
    paymentStauts: { type: String , required: true, enum: ["pending","paid","failed"], default: "pending"},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
