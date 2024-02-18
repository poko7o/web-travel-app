const router = require("express").Router();
const multer = require("multer");

// it takes the file and saves inside images file, and filename is the name we are providing on the client side
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images"); // second parameter is destination
  },
  filename: (req, file, callback) => {
    callback(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

//upload.single("name"), name must be the same as the key i.e. the key of the input name in form
router.post("/", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

module.exports = router;
