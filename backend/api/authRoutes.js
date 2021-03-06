const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = require("express").Router();
const { User } = require("../models");

router.get("/", (req, res) => {
  res.send(req.user);
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) throw error;
    if (!user) res.send({ error: "No User Exists" });
    else {
      req.logIn(user, (error) => {
        if (error) throw error;
        res.send(user);
      });
    }
  })(req, res, next);
});

router.post("/register", async (req, res, next) => {
  await User.findOne(
    { username: req.body.username, email: req.body.email },
    async (error, document) => {
      if (error) throw error;
      if (document) res.send(document);
      if (!document) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
          username: req.body.username,
          password: hashedPassword,
          email: req.body.email,
          zipCode: req.body.zipCode,
        });
        await newUser.save();
        res.send(newUser);
      }
    }
  );
});

router.delete("/logout", (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) throw error;
    req.logOut();
    req.session.destroy();
    if (!user) res.send({ error: "No User Logged In" });
  })(req, res, next);
});

module.exports = router;
