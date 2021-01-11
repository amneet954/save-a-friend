const router = require("express").Router();
const axios = require("axios");
const { Comment } = require("../models");

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const response = await Comment.find({ userId });
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:userId/:commentId", async (req, res) => {
  try {
    const { commentId, userId } = req.params;
    const response = await Comment.findOne({ _id: commentId, userId });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    let { content, userId } = req.body;
    const newComment = await new Comment({
      content,
      userId,
    });
    await newComment.save();
    res.send(newComment);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:userId/:commentId", async (req, res) => {
  try {
    const { commentId, userId } = req.params;
    const response = await Comment.deleteOne({ _id: commentId, userId });
    const { deletedCount } = response;
    res.json({ deletedCount });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
