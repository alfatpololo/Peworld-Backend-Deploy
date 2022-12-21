const express = require("express");
const {
  list,
  listByUser,
  detail,
  destroy,
  insert,
  updatePortofolio,
} = require("../controller/portofolio.controller");

// buat variabel dengan memanggil library express router
const router = express.Router();
const upload_image = require("../middleware/upload_image")
const deleteImage = require("../middleware/delete_image");

const jwtAuth = require("../middleware/jwtAuth");

router
  .get("/portofolio", list)
  .get("/portofolio/user/:id", listByUser)
  .get("/portofolio/detail/:id", detail)
  .post("/portofolio/insert", upload_image, insert)
  .delete("/portofolio/delete/:id", deleteImage, destroy)
  .put("/portofolio/update/:id", deleteImage, upload_image, updatePortofolio);

module.exports = router; // harus di ekspor agar bisa dipanggil di index