require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
const upload = require("../middleware/upload");
const { Report } = require("../models");
let accessToken = process.env.REACT_APP_MAPBOX_API;
const path = require("path");
const { sendMail } = require("../utilities");
const crypto = require("crypto");
const mongoose = require("mongoose");
let url = process.env.DB;
let zipcodeSearch = require("zipcodes");

//Get All Reports
//localhost:4000/report/
router.get("/", async (req, res, next) => {
  try {
    const query = await Report.find();
    res.send(query);
  } catch (error) {
    console.log(error);
  }
});

//Search Page Results
router.get("/search/:searchItem", async (req, res, next) => {
  try {
    const { searchItem } = req.params;
    let obj = {};
    if (searchItem !== "default") {
      obj = {
        petName: { $regex: searchItem, $options: "i" },
      };
    } else {
      obj = { found: "lost" };
    }
    const query = await Report.find(obj);
    res.send(query);
  } catch (error) {
    console.log(error);
  }
});

// Get Pets in Lost Area Nearby
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

//Get All Found Pets
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

//Get Pet By Id
router.get("/pet/:petId", async (req, res) => {
  try {
    const { petId } = req.params;

    const query = await Report.findOne({
      _id: petId,
    });

    const { petImageName } = query;
    res.status(200).json(query);
    // gfs.find({ filename: petImageName }).toArray((err, files) => {
    //   if (!files[0] || files.length === 0) {
    //     return res.status(200).json({
    //       success: false,
    //       message: "No files available",
    //     });
    //   }

    //   res.status(200).json({
    //     success: true,
    //     file: files[0],
    //     query,
    //   });
    // });
  } catch (error) {
    console.log(error);
  }
});

//Creates Lost Pet Post
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    let { userId, username, petName, lastPlaceSeen, contactEmail } = req.body;
    let petImageId = req.file.id;
    let petImageName = req.file.filename;

    let address = lastPlaceSeen.split(" ").join("%20");

    const coordinates = await axios({
      method: "GET",
      url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?country=US&access_token=${accessToken}`,
    });

    const { data } = coordinates;
    let bestSearch = data.features[0].context;
    let zipCode;
    for (let i = 0; i < bestSearch.length; i++) {
      let current = bestSearch[i];
      if (current.id.startsWith("postcode")) {
        zipCode = parseFloat(current.text);
        break;
      }
    }
    lastPlaceSeen = data.features[0].place_name;
    let values = data.features[0].geometry.coordinates;
    const longitude = values[0].toFixed(6);
    const latitude = values[1].toFixed(6);
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

    let subjectObj = { subject: `[SAF] New search call for ${petName}` };
    let reportURL = `http://localhost:3000/pet/${newReport._id}`;
    sendMail(contactEmail, username, subjectObj, petName, reportURL);

    res.send(newReport);
  } catch (error) {
    console.log("Error: ", error);
  }
  /////////////////////////////////////////////////////
  //   const { fileID } = req.body;
  //   if (req.file === undefined) return res.send("you must select a file.");
  //   const imgUrl = `http://localhost:4000/file/${req.file.filename}`;
  //   return res.send(imgUrl);
});

//Pet was Found
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
