const express = require('express')
const Router = express.Router();
const restaurantController = require('../controllers/restaurant-controller');
const { authorizeOwner } = require('../middleware/Auth-middleware')

Router.route('/createRestaurant/:ownerId').post(restaurantController.createRestaurant)
Router.route('/restaurants').get(restaurantController.getRestaurant);


module.exports = Router