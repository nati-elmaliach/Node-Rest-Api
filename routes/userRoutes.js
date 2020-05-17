const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post(
  '/users',
  //userController.validateData,
  userController.createNewUser
);

router.get('/admin/users', userController.getAllUsers);

module.exports = router;
