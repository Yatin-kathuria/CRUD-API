const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
class HashService {
  createToken(information) {
    return jwt.sign(information, process.env.JWT_SECRET);
  }

  verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }

  async encryptPassword(password) {
    return await bcrypt.hash(password, 12);
  }

  async decryptPassword(password, hashPassword) {
    return await bcrypt.compare(password, hashPassword);
  }
}

module.exports = new HashService();
