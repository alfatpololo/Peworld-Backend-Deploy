const express = require("express");
const {
  list,
  listByUser,
  detail,
  destroy,
  insert,
  updateExperience,
} = require("../controller/experience.controller");

// buat variabel dengan memanggil library express router
const router = express.Router();
router
  .get("/experience", list)
  .get("/experience/user/:id", listByUser)
  .get("/experience/detail/:id", detail)
  .post("/experience/insert", insert)
  .delete("/experience/delete/:id", destroy)
  .put("/experience/update/:id", updateExperience);

module.exports = router; // harus di ekspor agar bisa dipanggil di index
