const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url: process.env.DB,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const { fileID } = req.query;
    const match = ["image/png", "image/jpeg"];
    // let fileName = file.originalname.replace(/ /g, "");
    if (match.indexOf(file.mimetype) === -1) {
      // const filename = `${file.originalname}`;
      // const filename = `${fileName}`;
      const filename = `${fileID}`;
      return filename;
    }

    return {
      bucketName: "photos",
      // filename: `${fileName}`,
      filename: `${fileID}`,
    };
  },
});

module.exports = multer({ storage });
