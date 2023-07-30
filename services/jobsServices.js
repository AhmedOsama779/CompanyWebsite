const util = require("util");

class JobService {
  constructor(conn) {
    this.query = util.promisify(conn.query).bind(conn);
  }

  async getJobById(id) {
    const jobs = await this.query("SELECT * FROM jobs WHERE id = ?", [
      id,
    ]);
    return jobs;
  }

  async createJob(jobObj) {
    await this.query("insert into jobs set ? ", jobObj);
  }

  async showJobs() {
    return await this.query("select * from jobs");
  }
}

module.exports = JobService;
