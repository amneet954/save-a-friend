const express = require("express");
const app = express();
const authRoutes = require("./api/authRoutes");
const reportRoutes = require("./api/reportRoutes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const PORT = 4000;
const session = require("express-session");

const path = require("path");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");
const logger = require("morgan");

//Mongoose Connection
mongoose.connect(`mongodb://localhost:27017/save-a-friend`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

//Middleware
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretCode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser("secretCode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passport")(passport);
app.use("/auth", authRoutes);

app.use("/report", reportRoutes);
app.use("/api", require("./api")); //error handling

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
