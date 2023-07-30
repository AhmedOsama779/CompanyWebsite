const router = require("express").Router();
const fs = require("fs");
const conn = require("../Db/dbConnection");
const { body, validationResult } = require("express-validator");
const util = require("util");
const upload = require("../middleware/uploadImages");

const UserController = require("../controllers/userController");
const UserService = require("../services/userServices");
const UserValidator = require("../validator/userValidator");

const userService = new UserService(conn);
const userController = new UserController(userService);
const userValidator = UserValidator.validate();

router.post(
  "/create",
  upload.single("file"),
  userValidator,
  userController.createUser.bind(userController)
);

module.exports = router;
