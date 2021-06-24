const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');

router.get('/',userController.user);
// router for signin page
router.get('/login',userController.login);
// router for register page
router.get('/register',userController.register);
//router action for create user
router.post('/create',userController.create);
module.exports = router;