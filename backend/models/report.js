const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const report = new Schema({
  userId: String,
  petName: String,
  lastPlaceSeen: String,
  lastTimeOfUpdate: {
    default: Date.now(),
    type: Date,
  },
  contactEmail: String,
  zipCode: Number,
  geo: {
    longitude: Number,
    latitude: Number,
  },
  petImageName: {
    default: "test",
    required: true,
    type: String,
  },
  petImageId: {
    default: "test",
    required: true,
    type: String,
  },
  createdAt: {
    default: Date.now(),
    type: Date,
  },
});

const Report = model("Report", report);
module.exports = Report;
