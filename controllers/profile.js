const UserDtos = require("../dtos/user");
const userModal = require("../model/user");

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
}

module.exports = new Profile();
