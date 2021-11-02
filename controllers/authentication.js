const UserDtos = require("../dtos/user");
const userModal = require("../model/user");
const authenticationService = require("../Services/authentication");
const hashService = require("../Services/hashService");

class Authentication {
  async register(req, res) {
    try {
      const { name, email, password, role } = req.body;
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
      await userModal.create({ name, email, password: hashPassword, role });
      res.json({ message: "User is succefully registered." });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new Error("All Fields are mandatory");
      }
      if (!authenticationService.validateEmail(email)) {
        throw new Error("Invalid Email");
      }

      const user = await userModal.findOne({ email }).exec();
      if (!user) {
        throw new Error(
          "User is not exist with this Email. Please register yourself first"
        );
      }

      const isPasswordMatch = await hashService.decryptPassword(
        password,
        user.password
      );

      if (!isPasswordMatch) {
        throw new Error("Email or Password is incorrect");
      }

      const token = hashService.createToken({ _id: user._id, role: user.role });
      res.json({
        message: "Succesfully login",
        user: new UserDtos(user),
        token,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new Authentication();
