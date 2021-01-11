const mongoose = require("mongoose");
const { model, Schema } = mongoose;

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
    default: Date.now(),
    type: Date,
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
    default: false,
    required: true,
    type: Boolean,
  },
  createdAt: {
    default: Date.now(),
    type: Date,
  },
});

const Report = model("Report", report);
module.exports = Report;
