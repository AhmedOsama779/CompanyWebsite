const util = require("util");
const fs = require("fs");

class InternController {
  constructor(internService) {
    this.internService = internService;
  }

  async createIntern(req, res) {
    try {
      const errors = req.validationErrors();
      if (!errors) {
        return res.status(400).json({ errors: "error" });
      }

      // INSERT NEW Intern
      const internData = {
        InternshipName: req.body.InternshipName,
        InternshipEnvironment: req.body.InternshipEnvironment,
        InternshipTime: req.body.InternshipTime,
        InternshipResponsability: req.body.InternshipResponsability,
      };

      await this.internService.createIntern(internData);

      res.status(200).json({
        msg: "Intern created successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: ["Internal server error"] });
    }
  }



  async showInterns(req, res) {
    try {
      const interns = await this.internService.showinterns();
      if (interns) {
        res.status(200).json(interns);
      } else {
        res.status(404).json({ errors: ["No Interns found"] });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: ["Internal server error"] });
    }
  }
}
module.exports = InternController;
