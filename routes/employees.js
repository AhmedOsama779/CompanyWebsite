const router = require("express").Router();
const upload = require("../middleware/uploadImages");
// const createEmployee = require("../controllers/employees");
const fs = require("fs");
const conn = require("../Db/dbConnection");
const { body, validationResult } = require("express-validator");
const util = require("util");

const EmployeeController = require("../controllers/employeeController");
const EmployeeService = require("../services/employeesServices");
const EmployeeValidator = require("../validator/employeesValidator");

const employeeService = new EmployeeService(conn);
const employeeController = new EmployeeController(employeeService);
const employeeValidator = EmployeeValidator.validate();

// router.post(
//   "",
//   upload.single("image"),
//   body("name").isString().withMessage("please enter a valid employee name"),
//   body("age").isNumeric().withMessage("Please enter a valid age"),
//   body("position").isString().withMessage("Please enter a valid position"),
//   body("salary").isNumeric().withMessage("Please enter a valid salary"),
//   body("facebookLink").isURL(),
//   body("githubLink").isURL(),
//   async (req, res) => {
//     try {
//       // 1- VALIDATION REQUEST [manual, express validation]
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

//       // 2- VALIDATE THE IMAGE
//       let employee;
//         if (!req.file) {
//           return res.status(400).json({
//             errors: [
//               {
//                 msg: "Image is Required",
//               },
//             ],
//           });
//         }

//         employee = {
//           name: req.body.name,
//           age: req.body.age,
//           position: req.body.position,
//           salary: req.body.salary,
//           facebookLink:req.body.facebookLink,
//           githubLink: req.body.githubLink,
//           image_url: req.file.filename,
//         };

//       const query = util.promisify(conn.query).bind(conn);
//       await query("insert into employees set ? ", employee);
//       res.status(200).json({
//         msg: "employee created successfully !",
//       });
//     } catch (err) {
//       console.log(err);
//       // res.status(500).json(err);
//     }
//   }
// );

router.post(
  "/create",
  upload.single("image"),
  employeeValidator,
  employeeController.createEmployee.bind(employeeController)
);

// router.put(
//   "/:id", // params
//   upload.single("image"),
//   body("name").isLength({ min: 3 }),
//   body("age").isInt({ min: 18 }),
//   body("position").isString().withMessage("Please enter a valid position"),
//   body("salary").isNumeric().withMessage("Please enter a valid salary"),
//   body("facebookLink").isURL(),
//   body("githubLink").isURL(),
//   async (req, res) => {
//     try {
//       const query = util.promisify(conn.query).bind(conn);
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//       // check if employee exists
//       const employee = await query("select * from employees where id =?", [
//         req.params.id,
//       ]);
//       if (!employee[0]) {
//         res.status(400).json({ msg: "Employee not found" });
//       }

//       const employeeObj = {
//         name: req.body.name,
//         age: req.body.age,
//         position: req.body.position,
//         salary: req.body.salary,
//         facebookLink:req.body.facebookLink,
//         githubLink: req.body.githubLink,
//         image_url: req.file ? req.file.filename : employee[0].image_url,
//       };

//       if (req.file) {
//         fs.unlinkSync("./uploads/" + employee[0].image_url);
//       }

//       await query("update employees set ? where id =?", [
//         employeeObj,
//         employee[0].id,
//       ]);
//       res.send({
//         msg: "Employee updated",
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(500).send("An error occurred while updating employee");
//     }
//   }
// );

router.put(
  "/update/:id",
  upload.single("image"),
  employeeValidator,
  employeeController.updateEmployee.bind(employeeController)
);

// router.delete(
//   "/:id", // params
//   async (req, res) => {
//     try {
//       // check if employee Exisit
//       const query = util.promisify(conn.query).bind(conn); // transfer query mysql to --> promise to use (await,async)
//       const employee = await query("select * from employees where id =?", [
//         req.params.id,
//       ]);
//       if (!employee[0]) {
//         return res.status(400).json({ errors: ["Employee not found"] });
//       }

//       fs.unlinkSync("./uploads/" + employee[0].image_url);

//       await query("delete from employees  where id =?", [employee[0].id]);
//       res.status(200).json({
//         msg: "Employee Delete Success",
//       });
//     } catch (err) {
//       // res.status(500).json(err);
//     }
//   }
// );

router.delete(
  "/delete/:id",
  employeeValidator,
  employeeController.deleteEmployee.bind(employeeController)
);

// router.get("/getEmployees", async (req, res) => {
//   try{
//   const query = util.promisify(conn.query).bind(conn); // transfer query mysql to --> promise to use (await,async)
//   let search = "";
//   if (req.query.search) {
//     search = `where name like '%${req.query.search}%'`;
//   }
//   const employee = await query(`select * from employees ${search}`);
//   employee.map((employee) => {
//     employee.image_url = "http://" + req.hostname + ":3000/" + employee.image_url;
//   });
//   res.status(200).json(employee);
//   }catch(err){
//     console.log(err);
//   }
// });

router.get(
  "/showEmployees",
  employeeValidator,
  employeeController.showEmployees.bind(employeeController)
);

router.get(
  "/showEmployee/:id",
  employeeValidator,
  employeeController.showEmployee.bind(employeeController)
);

router.get(
  "/showSpecificEmpys/:job",
  employeeValidator,
  employeeController.showSpecificEmpys.bind(employeeController)
);

module.exports = router;
