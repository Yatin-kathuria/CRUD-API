const mongoose = require("mongoose");
const User = require("../model/user");
const hashService = require("../Services/hashService");

class MiddleWares {
  async requireLogin(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        throw new Error("you must be logged in");
      }
      const token = authorization.split(" ")[1];
      const verified = hashService.verifyToken(token);
      if (!verified) {
        throw new Error("Invalid Token");
      }
      const user = await User.findById(verified._id);
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  requireAdmin(req, res, next) {
    try {
      if (req.user.role !== "admin") {
        throw new Error("Only admin is authorized to perform this task");
      }
      next();
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = new MiddleWares();
