const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    name: { type: String },
    username: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_url: {type: String },
    phone: { type: String },
    addresses: [{ type : String }],
    isAdmin : { type: Boolean , default: false},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

userSchema.methods.generateToken = async function() {
    try {
      return jwt.sign({
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
     process.env.SECRET_KEY,
      { expiresIn: "30d" }
      );
    } catch (error) {
      console.error(error);
    }
  };

module.exports = mongoose.model('User', userSchema);
