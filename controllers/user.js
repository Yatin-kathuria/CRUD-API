const userModal = require("../model/user");
const authenticationService = require("../Services/authentication");
const hashService = require("../Services/hashService");

class User {
  createUser(req, res) {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        throw new Error("All Fields are mandatory");
      }
      if (!authenticationService.validateEmail(email)) {
        throw new Error("Invalid Email");
      }
      const user = await userModal.findOne({ email }).exec();
      if (user) {
        throw new Error("Email is registered with some other account");
      }

      const hashPassword = await hashService.encryptPassword(password);
      await userModal.create({
        ...req.body,
        name,
        email,
        password: hashPassword,
      });
      res.json({ message: "User is succefully registered." });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new User();
