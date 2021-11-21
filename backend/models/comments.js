const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const { time } = require("../utilities");

const comment = new Schema({
  content: {
    required: true,
    type: String,
  },
  userId: {
    required: true,
    type: String,
  },
  username: {
    type: String,
  },
  petCommentId: {
    type: String,
  },
  createdAt: {
    default: time(),
    type: String,
  },
});

const Comment = model("Comment", comment);
module.exports = Comment;
