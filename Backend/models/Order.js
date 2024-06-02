const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    items: [{ type: Schema.Types.ObjectId, ref: 'OrderItem' }],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Delivered', 'Cancelled'], default: 'Pending' },
    deliveryAddress: { type: Schema.Types.ObjectId, ref: 'Address', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
