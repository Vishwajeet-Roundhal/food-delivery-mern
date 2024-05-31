const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String , required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_url: {type: String },
    phone: { type: String, required: true },
    addresses: [{ type : String , required: true }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
