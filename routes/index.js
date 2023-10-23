const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const passport = require('passport');

router.get('/', passport.checkAuthentication, homeController.homePage);

router.use('/emp', require('./emp'));
router.use('/emp-details', require('./emp_details'));
router.use('/performance', require('./performance'));

module.exports = router;