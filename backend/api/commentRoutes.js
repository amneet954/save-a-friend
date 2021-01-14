const router = require("express").Router();
const axios = require("axios");
const { Comment, User } = require("../models");

// router.get("/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const response = await Comment.find({ userId });
//     res.send(response);
//   } catch (error) {
//     console.log(error);
//   }
// });

router.get("/:petCommentId", async (req, res) => {
  try {
    const { petCommentId } = req.params;
    const response = await Comment.find({ petCommentId });
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:userId/:petCommentId", async (req, res) => {
  try {
    const { petCommentId } = req.params;
    const response = await Comment.findOne({ petCommentId });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

//GET ALL FOR ONE PET
router.get("/singleCommentPage/:petCommentId", async (req, res) => {
  try {
    const { petCommentId } = req.params;
    //const response = await Comment.find({ petCommentId });
    const response = await Comment.findAll({ petCommentId });
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    let { content, userId, petCommentId } = req.body;
    console.log(petCommentId);
    const user = await User.findOne({ _id: userId });
    const { username } = user;
    const newComment = await new Comment({
      content,
      userId,
      username,
      petCommentId,
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

// content: "idk4"
// createdAt: "2021-01-12T00:52:48.857Z"
// userId: "5fcb1f6be50d881ab64001f3"
// username: "asandhu"
// __v: 0
// _id: "5ffcf2e8b018ab4c5c4e1fb3"
