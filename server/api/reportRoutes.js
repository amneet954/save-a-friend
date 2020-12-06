const router = require("express").Router();
const { Report } = require("../models");

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = await Report.find({ userId: id });
    res.send(query);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  console.log("hi");
  const { userId, petName, lastPlaceSeen, contactEmail, zipCode } = req.body;
  try {
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    let date = month + "/" + day + "/" + year;
    const newReport = await new Report({
      userId,
      petName,
      lastPlaceSeen,
      lastTimeOfUpdate: date,
      contactEmail,
      zipCode,
    });
    await newReport.save();
    res.send(newReport);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
