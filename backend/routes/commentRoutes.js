const router = require("express").Router();
const { Comment, User } = require("../models");
const { sendMail } = require("../utilities");

//Get All Comments for 1 Pet by Pet Comment ID
router.get("/:petCommentId", async (req, res) => {
  try {
    const { petCommentId } = req.params;
    const response = await Comment.find({ petCommentId });
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

//get all pet comment by the user for the specific pet
router.get("/:userId/:petCommentId", async (req, res) => {
  try {
    const { petCommentId } = req.params;
    const response = await Comment.findOne({ petCommentId });
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

//Get all comments for specific pet
router.get("/singleCommentPage/:petCommentId", async (req, res) => {
  try {
    const { petCommentId } = req.params;
    const response = await Comment.findAll({ petCommentId });
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

//Create Comment
router.post("/", async (req, res) => {
  try {
    let { content, petName, userId, petCommentId } = req.body;
    console.log(petCommentId);
    const user = await User.findOne({ _id: userId });
    const { username, email } = user;
    const newComment = await new Comment({
      content,
      userId,
      username,
      petCommentId,
    });
    await newComment.save();
    let subject = `[SAF] New Comments Regarding ${petName}'s status'`;
    let subjectObj = { subject, type: "Lost Pet Comment" };
    sendMail(
      email,
      username,
      subjectObj,
      petName,
      `http://localhost:3000/pet/${petCommentId}`
    );
    res.send(newComment);
  } catch (error) {
    console.log(error);
  }
});

//Delete Comment by ID
//Not Front End Facing Yet
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
