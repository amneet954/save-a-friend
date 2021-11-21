const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const { time } = require("../utilities");

const report = new Schema({
  userId: {
    required: true,
    type: String,
  },
  petName: {
    required: true,
    type: String,
  },
  lastPlaceSeen: {
    default: "NA",
    required: true,
    type: String,
  },
  lastTimeOfUpdate: {
    default: time(),
    type: String,
  },
  contactEmail: {
    required: true,
    type: String,
  },
  zipCode: {
    required: true,
    type: Number,
  },
  geo: {
    longitude: Number,
    latitude: Number,
  },
  petImageName: {
    required: true,
    type: String,
  },
  petImageId: {
    required: true,
    type: String,
  },
  found: {
    default: "lost",
    required: true,
    type: String,
  },
  createdAt: {
    default: time(),
    type: String,
  },
});

const Report = model("Report", report);
module.exports = Report;
