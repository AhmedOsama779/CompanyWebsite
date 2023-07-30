const util = require("util");
const fs = require("fs");

class JobController {
  constructor(jobService) {
    this.jobService = jobService;
  }

  async createJob(req, res) {
    try {
      const errors = req.validationErrors();
      if (!errors) {
        return res.status(400).json({ errors: "error" });
      }

      // INSERT NEW Job
      const jobData = {
        jobName: req.body.jobName,
        jobEnvironment: req.body.jobEnvironment,
        jobTime: req.body.jobTime,
        jobResponsability: req.body.jobResponsability,
        requirments: req.body.requirments,
        jobType: req.body.jobType,
        jobLocation: req.body.jobLocation,
      };

      await this.jobService.createJob(jobData);

      res.status(200).json({
        msg: "Job created successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: ["Internal server error"] });
    }
  }



  async showJobs(req, res) {
    try {
      const jobs = await this.jobService.showJobs();
      if (jobs) {
        res.status(200).json(jobs);
      } else {
        res.status(404).json({ errors: ["No Jobs found"] });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: ["Internal server error"] });
    }
  }

  async showJob(req, res) {
    try {
      const job = await this.jobService.getJobById(
        req.params.id
      );
      if (!job[0]) {
        return res.status(404).json({ errors: ["Job not found"] });
      }

      if (job) {
        res.status(200).json(job);
      } else {
        res.status(404).json({ errors: ["No Jobs found"] });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: ["Internal server error"] });
    }
  }
}
module.exports = JobController;
