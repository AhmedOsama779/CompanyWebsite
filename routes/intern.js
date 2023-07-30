const router = require("express").Router();
const fs = require("fs");
const conn = require("../Db/dbConnection");
const { body, validationResult } = require("express-validator");
const util = require("util");

const InternController = require("../controllers/internController");
const InternService = require("../services/internServices");
const InternValidator = require("../validator/internValidator");

const internService = new InternService(conn);
const internController = new InternController(internService);
const internValidator = InternValidator.validate();

router.post(
  "/create",
  internValidator,
  internController.createIntern.bind(internController)
);

router.get(
  "/showInterns",
  internValidator,
  internController.showInterns.bind(internController)
);

module.exports = router;
