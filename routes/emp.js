const express = require('express');
const router = express.Router();
const empController = require('../controllers/emp_controller');
const passport = require('passport');

//render pages
router.get('/sign-in', empController.signinPage);
router.get('/registration', empController.registrationPage);

router.post('/create-emp', empController.createEmp);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/emp/sign-in'}
) , empController.createSession);

router.get('/clear-session', empController.clearSession);

module.exports = router;