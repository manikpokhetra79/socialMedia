const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');
const passport = require('passport');
router.get('/',userController.user);
//router for profile page
router.get('/profile',passport.checkAuthentication,userController.profile);
// router for signin page
router.get('/login',userController.login);
// router for register page
router.get('/register',userController.register);
//router action for create user
router.post('/create',userController.create);
//use passport as a middleware for creating session
router.post('/create-session',passport.authenticate(
    'local',{
        failureRedirect : '/users/login',
    },),userController.createSession);
module.exports = router;

//signout 
router.get('/sign-out',userController.deleteSession);