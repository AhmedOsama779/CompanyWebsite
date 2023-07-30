const router = require("express").Router();
const fs = require("fs");
const conn = require("../Db/dbConnection");
const { body, validationResult } = require("express-validator");
const util = require("util");

const JobController = require("../controllers/jobsController");
const JobService = require("../services/jobsServices");
const JobValidator = require("../validator/jobsValidator");

const jobService = new JobService(conn);
const jobController = new JobController(jobService);
const jobValidator = JobValidator.validate();

router.post(
  "/create",
  jobValidator,
  jobController.createJob.bind(jobController)
);

router.get(
  "/showJobs",
  jobValidator,
  jobController.showJobs.bind(jobController)
);

router.get(
  "/showjob/:id",
  jobValidator,
  jobController.showJob.bind(jobController)
);

module.exports = router;
