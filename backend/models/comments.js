const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const time = () => {
  const value = Date.now();
  var date = new Date(value);
  let final = date.toLocaleString("en-US", { timeZone: "America/New_York" });
  return final;
};
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
