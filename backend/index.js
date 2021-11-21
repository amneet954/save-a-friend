require("dotenv").config();
const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const commentRoutes = require("./routes/commentRoutes");
const reportRoutes = require("./routes/reportRoutes");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");
const PORT = process.env.MONGO_PORT;
const session = require("express-session");
const path = require("path");
const logger = require("morgan");
const connection = require("./db");
const dbSeed = require("./dbSeed");
let gfs;
connection();

const conn = mongoose.connection;
conn.once("open", function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("photos");
});

//Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: process.env.CORS_PORT,
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
app.use("/comment", commentRoutes);
app.use("/report", reportRoutes);

//Error Handling Route
app.use("/api", require("./routes"));

// media routes

//Generates Image on Front End.
app.get("/file/:filename", async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.send("not found");
  }
});

app.delete("/file/:filename", async (req, res) => {
  try {
    await gfs.files.deleteOne({ filename: req.params.filename });
    res.send("success");
  } catch (error) {
    console.log(error);
    res.send("An error occured.");
  }
});

dbSeed();

const port = process.env.MONGO_PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
