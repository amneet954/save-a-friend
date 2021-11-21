const { Report } = require("./models");

let userId = "Default Pets";
let username = "SAF Organization";
let defaultPetsArray = [
  {
    petName: "Rocky",
    lastPlaceSeen: "5 Hanover Square 11th floor, New York, NY 10004",
    contactEmail: "petSaverSite@gmail.com",
    zipCode: 10004,
    geo: {
      longitude: -74.00918,
      latitude: 40.705011,
    },
    petImageId: username,
    petImageName: "SAF Organization",
  },
  {
    petName: "Pedro",
    lastPlaceSeen: "5 Hanover Square 11th floor, New York, NY 10004",
    contactEmail: "petSaverSite@gmail.com",
    zipCode: 10004,
    geo: {
      longitude: -74.00918,
      latitude: 40.705011,
    },
    petImageId: username,
    petImageName: "SAF Organization",
  },
  {
    petName: "Lassie",
    lastPlaceSeen: "200 Santa Monica Pier, Santa Monica, CA 90401",
    contactEmail: "petSaverSite@gmail.com",
    zipCode: 90401,
    geo: {
      longitude: -118.49583,
      latitude: 34.010021,
    },
    petImageId: username,
    petImageName: "SAF Organization",
  },
];

const seeding = async () => {
  for (let i = 0; i < defaultPetsArray.length; i++) {
    let current = defaultPetsArray[i];
    let {
      petName,
      lastPlaceSeen,
      contactEmail,
      zipCode,
      geo,
      petImageId,
      petImageName,
    } = current;

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
  }
};

const dbSeed = async () => {
  let query = await Report.findOne(defaultPetsArray[0]);

  if (!query) seeding();
};

module.exports = dbSeed;
