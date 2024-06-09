const express = require('express')
const router = express.Router();
const authController = require('../controllers/auth-controller');
const { userAuth } = require('../middleware/Auth-middleware')

router.route("/register").post(authController.register);
router.route("/login").post(userAuth,authController.login);
router.route('/updateUser').post(userAuth,authController.updateUser)

module.exports = router