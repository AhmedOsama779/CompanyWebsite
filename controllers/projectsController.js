const util = require("util");
const fs = require("fs");

class ProjectController {
  constructor(projectService) {
    this.projectService = projectService;
  }

  async updateProject(req, res) {
    try {
      const errors = req.validationErrors();
      if (!errors) {
        return res.status(400).json({ errors: "error" });
      }

      const project = await this.projectService.getProjectById(req.params.id);
      if (!project[0]) {
        return res.status(404).json({ errors: ["Project not found"] });
      }

      const projectObj = {
        collectionName: req.body.collectionName,
        image: req.file.filename,
      };

      if (req.file) {
        projectObj.image = req.file.filename;
        if (project && project.image) {
          fs.unlinkSync("../uploads/" + project[0].image);
        }
      }

      await this.projectService.updateProject(project[0].id, projectObj);

      res.status(200).json({
        msg: "Project updated",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: ["Internal server error"] });
    }
  }

  async createProject(req, res) {
    try {
      const errors = req.validationErrors();
      if (!errors) {
        return res.status(400).json({ errors: "error" });
      }
      if (!req.file) {
        return res.status(400).json({
          errors: [
            {
              msg: "Image is Required",
            },
          ],
        });
      }

      // INSERT NEW Project
      const projectData = {
        collectionName: req.body.collectionName,
        image: req.file.filename,
      };

      await this.projectService.createProject(projectData);

      res.status(200).json({
        msg: "Project created successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: ["Internal server error"] });
    }
  }

  async deleteProject(req, res) {
    try {
      const errors = req.validationErrors();
      if (!errors) {
        return res.status(400).json({ errors: "error" });
      }

      const project = await this.projectService.getProjectById(req.params.id);
      if (!project[0]) {
        return res.status(404).json({ errors: ["Project not found"] });
      }

      fs.unlinkSync("./uploads/" + project[0].image);

      await this.projectService.deleteProject(project[0].id);

      res.status(200).json({
        msg: "Project Deleted successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: ["Internal server error"] });
    }
  }

  async showProjects(req, res) {
    try {
      const projects = await this.projectService.showProjects();
      if (projects) {
        projects.map((project) => {
          project.image = "http://" + req.hostname + ":3000/" + project.image;
        });
        res.status(200).json(projects);
      } else {
        res.status(404).json({ errors: ["No Projects found"] });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: ["Internal server error"] });
    }
  }

  async showSpecificProjs(req, res) {
    try {
      const projects = await this.projectService.showSpecificProjs(
        req.params.collectionName
      );
      if (projects) {
        projects.map((project) => {
          project.image = "http://" + req.hostname + ":3000/" + project.image;
        });
        res.status(200).json(projects);
      } else {
        res.status(404).json({ errors: ["No Projects found"] });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: ["Internal server error"] });
    }
  }

  async showProject(req, res) {
    try {
      const project = await this.projectService.getProjectById(req.params.id);
      if (!project[0]) {
        return res.status(404).json({ errors: ["Project not found"] });
      }

      if (project) {
        project[0].image =
          "http://" + req.hostname + ":3000/" + project[0].image;
        res.status(200).json(project);
      } else {
        res.status(404).json({ errors: ["No Projects found"] });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: ["Internal server error"] });
    }
  }
}
module.exports = ProjectController;
