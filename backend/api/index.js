const router = require("express").Router();

// router.use("/report", require("./reportRoutes"));

router.use((req, res, next) => {
  const error = new Error("API route not found!");
  error.status = 404;
  next(error);
});

module.exports = router;
