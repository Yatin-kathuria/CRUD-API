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

  async verify(req, res) {
    try {
      const { id } = req.body;
      if (!id) {
        throw new Error("All Fields are mandatory");
      }
      const user = await userModal.findById({ _id: id }).exec();
      if (!user) {
        throw new Error("Invalid user ID");
      }

      user.verified = true;
      await user.save();
      res.json({ message: "User verified succefully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async token(req, res) {
    try {
      const token = hashService.createToken({
        _id: req.user._id,
        role: req.user.role,
      });
      res.json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async forgetPassword(req, res) {
    try {
      const { email } = req.body;
      if (!email) {
        throw new Error("All Fields are mandatory");
      }
      if (!authenticationService.validateEmail(email)) {
        throw new Error("Invalid Email");
      }
      const savedUser = await userModal.findOne({ email });
      if (!savedUser) {
        throw new Error("User not exist with this email ID");
      }
      const token = hashService.generateForgetPasswordToken({ email });
      res.json({
        token,
        message:
          "send this token to us during reset the password in Id field within 10 minutes.",
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async resetPassword(req, res) {
    try {
      const { token, password } = req.body;
      if (!token && !password) {
        throw new Error("All Fields are mandatory");
      }

      const { email } = hashService.verifyForgetPasswordToken(token);
      const savedUser = await userModal.findOne({ email });
      const isPasswordMatch = await hashService.decryptPassword(
        password,
        savedUser.password
      );

      if (isPasswordMatch) {
        throw new Error("Old and New Password must be different.");
      }

      const hashPassword = await hashService.encryptPassword(password);
      savedUser.password = hashPassword;
      await savedUser.save();
      res.json({ message: "Password Updated successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new Authentication();
