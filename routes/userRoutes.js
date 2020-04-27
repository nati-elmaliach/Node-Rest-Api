const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

router.post(
  "/users",
  userController.validateData,
  userController.createNewUser
);
router.get("/admin/users", userController.getAllUsers);

module.exports = router;
