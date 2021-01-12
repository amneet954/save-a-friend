const mongoose = require("mongoose");
const { model, Schema } = mongoose;

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
  createdAt: {
    default: Date.now(),
    type: Date,
  },
});

const Comment = model("Comment", comment);
module.exports = Comment;
