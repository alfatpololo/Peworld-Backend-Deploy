// import multer
const multer = require("multer");

//import path
const path = require("path");

//untuk management file
const multerUpload = multer({
  storage: multer.diskStorage({
    
    
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = Date.now() + "" + ext;
      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext === ".jpg" || ext === ".png" || ext === ".PNG") {
      cb(null, true);
    } else {
      const error = {
        messsage: "File must be jpg or png",
      };
      cb(error, false);
    }
  },
  //Size file max 2MB compare to characters
  // limits: { fileSize: 20971520000 },
});

//untuk middleware
const upload_image = (req, res, next) => {
  const multerSingle = multerUpload.single("image");
  multerSingle(req, res, (err) => {
    if (err) {
      res.json({
        messsage: "err",
        error: err,
      });
    } else {
      next();
    }
  });
};

module.exports = upload_image;