const util = require("util");

class EmployeeService {
  constructor(conn) {
    this.query = util.promisify(conn.query).bind(conn);
  }

  async getEmployeeById(id) {
    const employees = await this.query("SELECT * FROM employees WHERE id = ?", [
      id,
    ]);
    return employees;
  }

  async updateEmployee(id, employeeObj) {
    await this.query("UPDATE employees SET ? WHERE id = ?", [employeeObj, id]);
  }

  async createEmployee(employeeObj) {
    await this.query("insert into employees set ? ", employeeObj);
  }

  async deleteEmployee(id) {
    await this.query("delete from employees  where id =?", [id]);
  }

  async showEmployees() {
    return await this.query("select * from employees");
  }

  async showSpecificEmpys(job) {
    return await this.query("select * from employees where job = ?", [job]);
  }
}

module.exports = EmployeeService;
