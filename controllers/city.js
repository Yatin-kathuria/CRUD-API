const CityDtos = require("../dtos/city");
const cityModal = require("../model/city");

class City {
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
}

module.exports = new City();
