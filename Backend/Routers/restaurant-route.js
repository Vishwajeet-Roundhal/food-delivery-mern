const express = require('express')
const Router = express.Router();
const restaurantController = require('../controllers/restaurant-controller');
const dishController = require('../controllers/dish-controller')
const { authorizeOwner } = require('../middleware/Auth-middleware')

Router.route('/createRestaurant/:ownerId').post(restaurantController.createRestaurant)
Router.route('/restaurants').get(restaurantController.getRestaurant);
Router.route('/updateRestaurant/:restaurantId').patch(restaurantController.updateRestaurant)
Router.route('/deleteRestaurant/:id').delete(restaurantController.deleteRestaurant)

Router.route('/createDish/:restaurantId').post(dishController.createDish)


module.exports = Router