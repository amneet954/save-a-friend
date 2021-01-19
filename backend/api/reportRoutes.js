const router = require("express").Router();
const axios = require("axios");
const { Report } = require("../models");
let accessToken =
  "pk.eyJ1IjoiYW1uZWV0OTU0IiwiYSI6ImNqdjJpd215dzB5azIzeXFvZDMxbmk2ZDYifQ.FIIav70z0itM7EsJHAe_6A";
const path = require("path");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");
const mongoose = require("mongoose");
let url = `mongodb://localhost:27017/save-a-friend`;
let zipcodeSearch = require("zipcodes");

const storage = new GridFsStorage({
  url,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

let connect = mongoose.createConnection(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;

connect.once("open", () => {
  // initialize stream
  gfs = new mongoose.mongo.GridFSBucket(connect.db, {
    bucketName: "uploads",
  });
});

//GET ALL REPORTS ROUTE
router.get("/", async (req, res, next) => {
  try {
    // const query = await Report.find({ userId });
    const query = await Report.find();
    res.send(query);
  } catch (error) {
    console.log(error);
  }
});

// GET PETS THAT ARE LOST IN NEARBY AREA
router.get("/homePage/", async (req, res) => {
  try {
    const zipCodeResponse = await axios({
      method: "GET",
      baseURL: "http://ip-api.com/json/",
    });

    const { data } = zipCodeResponse;
    const { zip } = data;
    var radius = zipcodeSearch.radius(zip, 2);

    const response = await Report.find({
      zipCode: { $in: radius },
      found: "lost",
    });

    res.send(response);
  } catch (error) {
    console.log("Error: ", error);
  }
});

//SEARCHING FOR LOST OR FOUND PETS
router.get("/foundPets/:truthy", async (req, res, next) => {
  try {
    const { truthy } = req.params;

    const query = await Report.find({ found: truthy });

    console.log("QUERY HERE: ", query);
    res.send(query);
  } catch (error) {
    console.log(error);
  }
});

//GETTING INDIVIDUAL PET
router.get("/pet/:petId", async (req, res) => {
  try {
    const { petId } = req.params;

    const query = await Report.findOne({
      _id: petId,
    });

    const { petImageName } = query;

    gfs.find({ filename: petImageName }).toArray((err, files) => {
      if (!files[0] || files.length === 0) {
        return res.status(200).json({
          success: false,
          message: "No files available",
        });
      }

      res.status(200).json({
        success: true,
        file: files[0],
        query,
      });
    });
  } catch (error) {
    console.log(error);
  }
});

//ONLY TO GENERATE IMAGE ON FRONT END SIDE. DON'T USE POSTMAN
router.get("/pet/:petId/:id", async (req, res) => {
  try {
    const { id, petId } = req.params;
    gfs.find({ filename: id }).toArray((err, files) => {
      if (!files[0] || files.length === 0) {
        return res.status(200).json({
          success: false,
          message: "No files available",
        });
      }

      if (
        files[0].contentType === "image/jpeg" ||
        files[0].contentType === "image/png" ||
        files[0].contentType === "image/svg+xml"
      ) {
        // render image to browser
        gfs.openDownloadStreamByName(id).pipe(res);
      } else {
        res.status(404).json({
          err: "Not an image",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//http://localhost:4000/report/file
router.route("/file").post(upload.single("file"), async (req, res, next) => {
  try {
    let { userId, petName, lastPlaceSeen, contactEmail, zipCode } = req.body;
    let petImageId = req.file.id;
    let petImageName = req.file.filename;

    let address = lastPlaceSeen.split(" ").join("%20");

    const coordinates = await axios({
      method: "GET",
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?country=US&access_token=${accessToken}`,
    });

    const { data } = coordinates;
    lastPlaceSeen = data.features[0].place_name;
    let values = data.features[0].geometry.coordinates;
    const longitude = values[0];
    const latitude = values[1];
    let geo = { longitude, latitude };

    const newReport = await new Report({
      userId,
      petName,
      lastPlaceSeen,
      contactEmail,
      zipCode,
      geo,
      petImageId,
      petImageName,
    });
    await newReport.save();
    res.send(newReport);
  } catch (error) {
    console.log("Error: ", error);
  }
});

//PET WAS FOUND
router.put("/pet/found/:petId", async (req, res) => {
  try {
    const { petId } = req.params;
    const filter = { _id: petId };
    const update = { found: "found" };
    let newArg = { new: true };
    const updatedReport = await Report.findOneAndUpdate(filter, update, newArg);
    res.send(updatedReport);
  } catch (error) {
    console.log("Error: ", error);
  }
});

module.exports = router;
