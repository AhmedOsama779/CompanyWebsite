const router = require("express").Router();
const upload = require("../middleware/uploadImages");
// const createEmployee = require("../controllers/employees");
const fs = require("fs");
const conn = require("../Db/dbConnection");
const { body, validationResult } = require("express-validator");
const util = require("util");

const ProjectController = require("../controllers/projectsController");
const ProjectService = require("../services/projectServices");
const ProjectValidator = require("../validator/projectValidator");

const projectService = new ProjectService(conn);
const projectController = new ProjectController(projectService);
const projectValidator = ProjectValidator.validate();

router.post(
  "/create",
  upload.single("image"),
  projectValidator,
  projectController.createProject.bind(projectController)
);

router.put(
  "/update/:id",
  upload.single("image"),
  projectValidator,
  projectController.updateProject.bind(projectController)
);

router.delete(
  "/delete/:id",
  projectValidator,
  projectController.deleteProject.bind(projectController)
);

router.get(
  "/showProjects",
  projectValidator,
  projectController.showProjects.bind(projectController)
);

router.get(
  "/showProject/:id",
  projectValidator,
  projectController.showProject.bind(projectController)
);

router.get(
  "/showSpecificProjs/:collectionName",
  projectValidator,
  projectController.showSpecificProjs.bind(projectController)
);

module.exports = router;
