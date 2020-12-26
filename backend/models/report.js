const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const report = new Schema({
  userId: String,
  petName: String,
  lastPlaceSeen: String,
  lastTimeOfUpdate: String,
  contactEmail: String,
  zipCode: Number,
  geo: {
    longitude: Number,
    latitude: Number,
  },
  petImage: { data: Buffer, contentType: String },
});

const Report = model("Report", report);
module.exports = Report;
