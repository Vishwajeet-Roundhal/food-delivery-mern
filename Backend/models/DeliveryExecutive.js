const mongoose = require("mongoose");

const deliveryExecutiveSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: Number, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: { type: [Number] },
  },
  status: { type: String, default: "available" },
});

deliveryExecutiveSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("DeliveryExecutive", deliveryExecutiveSchema);
