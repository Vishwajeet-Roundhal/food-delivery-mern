const express = require('express')
const Router = express.Router();
const restaurantController = require('../controllers/restaurant-controller');
const dishController = require('../controllers/dish-controller')
const orderController = require('../controllers/order-controller')
const { authorizeOwner, userAuth } = require('../middleware/Auth-middleware')

Router.route('/createRestaurant/:ownerId').post(restaurantController.createRestaurant)
Router.route('/restaurants').get(restaurantController.getRestaurant);
Router.route('/updateRestaurant/:restaurantId').patch(authorizeOwner,restaurantController.updateRestaurant)
Router.route('/deleteRestaurant/:id').delete(authorizeOwner,restaurantController.deleteRestaurant)
Router.route('/searchRestaurant').get(restaurantController.searchRestaurant)


Router.route('/createDish/:restaurantId').post(dishController.createDish)
Router.route('/getDishes/:restaurantId').get(dishController.getDishes);



Router.route('/createOrder/:restaurantId').post(userAuth,orderController.createOrder);
module.exports = Router