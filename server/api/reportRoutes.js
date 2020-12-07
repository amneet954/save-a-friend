const router = require("express").Router();
const axios = require("axios");
const { Report } = require("../models");
let accessToken =
  "pk.eyJ1IjoiYW1uZWV0OTU0IiwiYSI6ImNqdjJpd215dzB5azIzeXFvZDMxbmk2ZDYifQ.FIIav70z0itM7EsJHAe_6A";
// let address = "104-60 111th Street"
// address = address.split(" ")
// address = address.join("%20")
// console.log(address)

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = await Report.find({ userId: id });
    res.send(query);
  } catch (error) {
    console.log(error);
  }
});

// router.get("/geo/:address", async (req, res) => {
//   let { address } = req.params;
//   const coordinates = await axios({
//     method: "GET",
//     url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?country=US&access_token=${accessToken}`,
//   });

//   const { data } = coordinates;
//   let place = data.features[0].place_name;
//   // const longitude = values[0];
//   // const latitude = values[1];
//   res.send(place);
// });

router.post("/", async (req, res, next) => {
  try {
    let { userId, petName, lastPlaceSeen, contactEmail, zipCode } = req.body;
    let address = lastPlaceSeen.split(" ").join("%20");

    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let date = month + "/" + day + "/" + year;
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
      lastTimeOfUpdate: date,
      contactEmail,
      zipCode,
      geo,
    });
    await newReport.save();
    res.send(newReport);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
