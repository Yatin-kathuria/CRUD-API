const CityDtos = require("../dtos/city");
const UserDtos = require("../dtos/user");
const cityModal = require("../model/city");
const userModal = require("../model/user");

class Profile {
  async createCity(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        throw new Error("All fields are required");
      }
      const cityExist = await cityModal.findOne({ name });
      if (cityExist) {
        throw new Error("City already exist.");
      }
      const city = await cityModal.create({ name });
      res.json({
        message: "City created Sucessfully.",
        city: new CityDtos(city),
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getProfile(req, res) {
    try {
      const profile = await userModal.findById({ _id: req.user._id });
      res.json({ profile: new UserDtos(profile) });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async singleCity(req, res) {
    try {
      const { id } = req.params;
      const city = await cityModal.findById({ _id: id });
      if (!city) {
        throw new Error("City not found.Please verify the City ID");
      }
      res.json({ city: new CityDtos(city) });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteCity(req, res) {
    try {
      const { id } = req.params;
      await cityModal.deleteOne({ _id: id });
      res.json({ city: `city with id ${id} deleted sucessfully ` });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateCity(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      if (!name) {
        throw new Error("Name field is required");
      }
      await cityModal.updateOne({ _id: id }, { name });
      res.json({ message: "City updated" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async listCity(req, res) {
    try {
      // const filter = req.query.filter || "Bucaramanga";
      let fields = req.query.fields || "";
      const page = req.query.page || 1;
      const limitPerPage = req.query.limit || 5;
      const sort = req.query.sort || "name";
      const order = req.query.order || -1;
      fields = fields.split(",").join(" ");

      const cities = await cityModal
        .find({})
        .select(fields)
        .skip((page - 1) * limitPerPage)
        .limit(Number(limitPerPage))
        .sort({ [sort]: order });

      res.json({ cities });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new Profile();
