const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
    dish: { type: Schema.Types.ObjectId, ref: 'Dish', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('OrderItem', orderItemSchema);
