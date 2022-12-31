const express = require('express');
const userController = require('../controllers/users_controller');
const router = express.Router();

router.get('/profile', userController.profile);
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.post('/create', userController.create);

module.exports = router;