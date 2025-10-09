import env from "../../../config/env.js";

class AdminRepository {
  async validateCredentials(username, password) {
    return username === env.adminMail && password === env.adminToken;
  }
}

export default new AdminRepository();
