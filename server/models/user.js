const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const user = new Schema({
  username: String,
  password: String,
  email: String,
  zipCode: String,
});

const User = model("User", user);
module.exports = User;
