const util = require("util");

class ProjectService {
  constructor(conn) {
    this.query = util.promisify(conn.query).bind(conn);
  }

  async getProjectById(id) {
    const projects = await this.query("SELECT * FROM projects WHERE id = ?", [
      id,
    ]);
    return projects;
  }

  async updateProject(id, projectObj) {
    await this.query("UPDATE projects SET ? WHERE id = ?", [projectObj, id]);
  }

  async createProject(projectObj) {
    await this.query("insert into projects set ? ", projectObj);
  }

  async deleteProject(id) {
    await this.query("delete from projects  where id =?", [id]);
  }

  async showProjects() {
    return await this.query("select * from projects");
  }

  async showSpecificProjs(collectionName) {
    return await this.query("select * from projects where collectionName = ?", [
      collectionName,
    ]);
  }
}

module.exports = ProjectService;
