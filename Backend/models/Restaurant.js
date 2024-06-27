const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  restaurant_name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String , required: true },
  phone: { type: String, required: true },
  cuisine: { type: String, required: true },
  restaurant_img: [{ type: String }],
  review_rating: { type: Number , default: 0 },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  latitude: { type: Number },
  longitude: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});



module.exports = mongoose.model("Restaurant", restaurantSchema);
