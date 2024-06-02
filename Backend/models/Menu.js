const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    dishes: [{ type: Schema.Types.ObjectId, ref: 'Dish' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Menu', menuSchema);
