import jwt from "jsonwebtoken";
import env from "../../config/env.js";
import AdminRepository from "./repositories/users.repository.js";

class AdminService {
  // Login de Admin
  async login(username, password) {
    const isValid = await AdminRepository.validateCredentials(username, password);

    if (!isValid) return null;

    const token = jwt.sign({ role: "admin" }, env.jwtSecret, { expiresIn: "2h" });
    return token;
  }
}

export default new AdminService();
