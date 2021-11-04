const UserDtos = require("../dtos/user");
const userModal = require("../model/user");
const authenticationService = require("../Services/authentication");
const hashService = require("../Services/hashService");

class User {
  async createUser(req, res) {
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
      const savedUser = await userModal.create({
        ...req.body,
        name,
        email,
        password: hashPassword,
      });
      res.json({
        message: "User is succefully registered.",
        id: savedUser._id,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await userModal.deleteOne({ _id: id }).exec();
      res.json({ message: "User is succefully deleted.", id });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async singleUser(req, res) {
    try {
      const { id } = req.params;
      const user = await userModal.findOne({ _id: id }).exec();
      if (!user) {
        throw new Error("Invalid user id provided");
      }
      res.json({ message: "User Found", user: new UserDtos(user) });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async listUser(req, res) {
    try {
      // const filter = req.query.filter || "ad";
      let fields = req.query.fields || "name,email";
      const page = req.query.page || 1;
      const limitPerPage = req.query.limit || 5;
      const sort = req.query.sort || "name";
      const order = req.query.order || -1;
      fields = fields.split(",").join(" ");

      const users = await userModal
        .find({})
        .select(fields)
        .skip((page - 1) * limitPerPage)
        .limit(Number(limitPerPage))
        .sort({ [sort]: order });

      res.json({ users });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      await userModal.updateOne({ _id: id }, req.body);
      res.json({ message: "User updated" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new User();
