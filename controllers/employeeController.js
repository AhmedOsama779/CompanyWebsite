const util = require("util");
const fs = require("fs");

class EmployeeController {
  constructor(employeeService) {
    this.employeeService = employeeService;
  }

  async updateEmployee(req, res) {
    try {
      const errors = req.validationErrors();
      if (!errors) {
        return res.status(400).json({ errors: "error" });
      }

      const employee = await this.employeeService.getEmployeeById(
        req.params.id
      );
      if (!employee[0]) {
        return res.status(404).json({ errors: ["Employee not found"] });
      }

      const employeeObj = {
        name: req.body.name,
        age: req.body.age,
        job: req.body.job,
        position: req.body.position,
        salary: req.body.salary,
        facebookLink: req.body.facebookLink,
        githubLink: req.body.githubLink,
        image_url: req.file.filename,
      };

      if (req.file) {
        employeeObj.image_url = req.file.filename;
        if (employee && employee.image_url) {
          fs.unlinkSync("../uploads/" + employee[0].image_url);
        }
      }

      await this.employeeService.updateEmployee(employee[0].id, employeeObj);

      res.status(200).json({
        msg: "Employee updated",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: ["Internal server error"] });
    }
  }

  async createEmployee(req, res) {
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

      // INSERT NEW Employee
      const employeeData = {
        name: req.body.name,
        age: req.body.age,
        job: req.body.job,
        position: req.body.position,
        salary: req.body.salary,
        facebookLink: req.body.facebookLink,
        githubLink: req.body.githubLink,
        image_url: req.file.filename,
      };

      await this.employeeService.createEmployee(employeeData);

      res.status(200).json({
        msg: "Employee created successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: ["Internal server error"] });
    }
  }

  async deleteEmployee(req, res) {
    try {
      const errors = req.validationErrors();
      if (!errors) {
        return res.status(400).json({ errors: "error" });
      }

      const employee = await this.employeeService.getEmployeeById(
        req.params.id
      );
      if (!employee[0]) {
        return res.status(404).json({ errors: ["Employee not found"] });
      }

      fs.unlinkSync("./uploads/" + employee[0].image_url);

      await this.employeeService.deleteEmployee(employee[0].id);

      res.status(200).json({
        msg: "Employee Deleted successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: ["Internal server error"] });
    }
  }

  async showEmployees(req, res) {
    try {
      const employees = await this.employeeService.showEmployees();
      if (employees) {
        employees.map((employee) => {
          employee.image_url =
            "http://" + req.hostname + ":3000/" + employee.image_url;
        });
        res.status(200).json(employees);
      } else {
        res.status(404).json({ errors: ["No Employees found"] });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: ["Internal server error"] });
    }
  }

  async showSpecificEmpys(req, res) {
    try {
      const employees = await this.employeeService.showSpecificEmpys(
        req.params.job
      );
      if (employees) {
        employees.map((employee) => {
          employee.image_url =
            "http://" + req.hostname + ":3000/" + employee.image_url;
        });
        res.status(200).json(employees);
      } else {
        res.status(404).json({ errors: ["No Employees found"] });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: ["Internal server error"] });
    }
  }

  async showEmployee(req, res) {
    try {
      const employee = await this.employeeService.getEmployeeById(
        req.params.id
      );
      if (!employee[0]) {
        return res.status(404).json({ errors: ["Employee not found"] });
      }

      if (employee) {
        employee[0].image_url =
          "http://" + req.hostname + ":3000/" + employee[0].image_url;
        res.status(200).json(employee);
      } else {
        res.status(404).json({ errors: ["No Employees found"] });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ errors: ["Internal server error"] });
    }
  }
}
module.exports = EmployeeController;
