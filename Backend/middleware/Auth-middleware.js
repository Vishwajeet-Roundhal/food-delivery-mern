const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant')

const userAuth = async (req, res, next) => {
  try {
    const token = await req.header("Authorization");

    if (!token) {
      return res.status(401).json({ msg: "no token found" });
    }

    const bearerToken = token.replace("Bearer", "").trim();

    const isVerify = jwt.verify(bearerToken, process.env.SECRET_KEY);

    const userData = await User.findOne({ email: isVerify.email });

    if (!userData) {  
      return res.status(200).json({ msg: "user not found" });
    }
    console.log("user =>", userData);

    req.user = userData;
    req.token = token;
    req.userID = userData._id;

    next();
  } catch (error) {
    return res.status(500).json({ error: "error verifying token" });
  }
};


const adminValidator = async (req,res,next) => {
  try {
      const admin = req.user.isAdmin;
      console.log(admin);
      if(!admin){
          return res.status(401).json({msg:"you are not authorized to perform this operation"})
      }
      next();
  } catch (error) {
      return res.status(400).json({msg:"something went wrong"})
  }
}

const authorizeOwner = async (req, res, next) => {
    try {
        const token = await req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const userId = decoded._id;

        const restaurantId = req.params.restaurantId;
        const restaurant = await Restaurant.findById(restaurantId);

        if (!restaurant) {
            return res.status(404).json({ msg: 'Restaurant not found' });
        }

        if (restaurant.owner.toString() !== userId) {
            return res.status(403).json({ msg: 'Not authorized to update this restaurant' });
        }

        req.restaurant = restaurant; // Pass the restaurant to the next middleware
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Please authenticate' });
    }
};


module.exports = {userAuth, adminValidator, authorizeOwner}