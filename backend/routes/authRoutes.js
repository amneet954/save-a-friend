const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = require("express").Router();
const { User } = require("../models");
const { sendMail } = require("../utilities");

//Get User Info
router.get("/", (req, res) => {
  const { user } = req;
  res.send(user);
});

//Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) res.send(error);
    if (!user) res.send({ error: "No User Exists" });
    else {
      req.logIn(user, (error) => {
        if (error) res.send({ error });

        res.send(user);
      });
    }
  })(req, res, next);
});

// Change Password
router.post("/updateUserInfo", async (req, res, next) => {
  const { username, password, email, updateType } = req.body;
  await User.findOne({ username, email }, async (error, document) => {
    if (error) res.send({ error: error });
    const hashedPassword = await bcrypt.hash(password, 10);
    if (updateType === "Password Reset") {
      const passwordUpate = await User.updateOne(
        { username },
        { $set: { password: hashedPassword } }
      );
      res.send(passwordUpate);
    }
  });
});

//Register a New User
router.post("/register", async (req, res, next) => {
  const { username, password, email } = req.body;
  await User.findOne({ username, email }, async (error, document) => {
    if (error) throw error;
    if (document) res.send(document);
    if (!document) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: hashedPassword,
        email,
      });
      await newUser.save();
      let subjectObj = {
        subject: `${username}, Welcome to the Save-A-Friend community!`,
        type: "New User",
      };
      sendMail(email, username, subjectObj);
      res.send(newUser);
    }
  });
});

//Log Out
router.delete("/logout", (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) throw error;
    req.logOut();
    req.session.destroy();
    if (!user) res.send({ error: "No User Logged In" });
  })(req, res, next);
});

module.exports = router;
