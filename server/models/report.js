const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const report = new Schema({
  userId: String,
  petName: String,
  lastPlaceSeen: String,
  lastTimeOfUpdate: String,
  contactEmail: String,
  zipCode: String,
});

const Report = model("Report", report);
module.exports = Report;
