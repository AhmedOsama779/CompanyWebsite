const util = require("util");

class UserService {
  constructor(conn) {
    this.query = util.promisify(conn.query).bind(conn);
  }
  async createUser(userObj) {
    await this.query("insert into userschema set ? ", userObj);
  }
}

module.exports = UserService;
