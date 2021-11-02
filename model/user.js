const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: { type: String, required: true },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: false,
      default: "user",
    },
    phone: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
