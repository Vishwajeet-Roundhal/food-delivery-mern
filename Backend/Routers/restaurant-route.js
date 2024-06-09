const express = require('express')
const Router = express.Router();
const restaurantController = require('../controllers/restaurant-controller');
const dishController = require('../controllers/dish-controller')
const orderController = require('../controllers/order-controller')
const { authorizeOwner, userAuth } = require('../middleware/Auth-middleware')

Router.route('/createRestaurant/:ownerId').post(restaurantController.createRestaurant)
Router.route('/restaurants').get(restaurantController.getRestaurant);
Router.route('/getRestaurantById/:restaurantId').get(restaurantController.getRestaurantById)
Router.route('/updateRestaurant/:restaurantId').patch(authorizeOwner,restaurantController.updateRestaurant)
Router.route('/deleteRestaurant/:id').delete(authorizeOwner,restaurantController.deleteRestaurant)
Router.route('/searchRestaurant').get(restaurantController.searchRestaurant)
Router.route('/getRestaurantByCity').get(restaurantController.getRestaurantByCity)
Router.route('/getRestaurantByCuisine').get(restaurantController.getRestaurantByCuisine)
Router.route('/getRestaurantByRating').get(restaurantController.getRestaurantByRating)
Router.route('/restaurantFromUser').get(restaurantController.restaurantDistanceFromUser)


//Dish routes
Router.route('/createDish/:restaurantId').post(authorizeOwner,dishController.createDish)
Router.route('/getDishes/:restaurantId').get(dishController.getDishes);
Router.route('/updateMenu/:restaurantId').post(authorizeOwner,dishController.updateMenu)
Router.route('/updateDish/:dishId').patch(authorizeOwner,dishController.updateDish)
Router.route('/deleteDish/:dishId').delete(authorizeOwner,dishController.deleteDish)
Router.route('/searchDish/:restaurantId').get(dishController.searchDish)


//Order routes
Router.route('/createOrder/:restaurantId').post(userAuth,orderController.createOrder);
Router.route('/updateOrder/:orderId').patch(authorizeOwner,orderController.updateOrderById)
Router.route('/getAllOrdersByUser').get(userAuth,orderController.getAllOrdersByUser)
Router.route('/restaurantSales/:restaurantId').get(orderController.restaurantSales)


module.exports = Router