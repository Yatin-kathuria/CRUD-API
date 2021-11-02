const mongoose = require("mongoose");
const User = require("../models/user");
const hashService = require("../Services/hashService");

class MiddleWares {
  requireLogin(req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        throw new Error("you must be logged in");
      }
      const token = authorization.split(" ")[1];
      const verified = hashService.verifyToken(token);
      //   jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
      //     if (error) {
      //       return res.status(401).json({
      //         error: "you must be logged in",
      //       });
      //     }
      //     const { _id } = payload;
      //     User.findById(_id).then((user) => {
      //       req.user = user;
      //       next();
      //     });
      //   });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}
