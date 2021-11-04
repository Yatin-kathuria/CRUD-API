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

  generateForgetPasswordToken(payload) {
    const token = jwt.sign(payload, process.env.FORGET_PASSWORD_SECRET, {
      expiresIn: Date.now() + 10 * 1000, // 10 mins
    });
    return token;
  }

  verifyForgetPasswordToken(token) {
    return jwt.verify(token, process.env.FORGET_PASSWORD_SECRET);
  }
}

module.exports = new HashService();
