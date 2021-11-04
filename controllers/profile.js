const UserDtos = require("../dtos/user");
const userModal = require("../model/user");
const hashService = require("../Services/hashService");

class Profile {
  async getProfile(req, res) {
    try {
      const profile = await userModal.findById({ _id: req.user._id });
      res.json({ profile: new UserDtos(profile) });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateProfile(req, res) {
    try {
      await userModal.updateOne({ _id: req.user._id }, req.body);
      res.json({ message: "Profile updated" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async changePassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      if (!oldPassword || !newPassword) {
        throw new Error("All Fields are mandatory");
      }

      if (oldPassword === newPassword) {
        throw new Error("Old password and New Password can't be same.");
      }

      const savedUser = await userModal.findById({ _id: req.user._id });
      const isPasswordMatch = await hashService.decryptPassword(
        oldPassword,
        savedUser.password
      );

      if (!isPasswordMatch) {
        throw new Error("Old Password is incorrect");
      }

      const hashPassword = await hashService.encryptPassword(newPassword);
      savedUser.password = hashPassword;
      await savedUser.save();
      res.json({ message: "Password Updated successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new Profile();
