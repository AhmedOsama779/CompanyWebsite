const util = require("util");

class InternService {
  constructor(conn) {
    this.query = util.promisify(conn.query).bind(conn);
  }

  async createIntern(internObj) {
    await this.query("insert into internship set ? ", internObj);
  }

  async showinterns() {
    return await this.query("select * from internship");
  }
}

module.exports = InternService;
