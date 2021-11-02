const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected ");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = dbConnection;
