const express = require("express");
const {
  list,
  listByUser,
  detail,
  destroy,
  insert,
  updateSkill,
} = require("../controller/skill.controller");

// buat variabel dengan memanggil library express router
const router = express.Router();
router
  .get("/skill", list)
  .get("/skill/user/:id", listByUser)
  .get("/skill/detail/:id", detail)
  .post("/skill/insert", insert)
  .delete("/skill/delete/:id", destroy)
  .put("/skill/update/:id", updateSkill);

module.exports = router; // harus di ekspor agar bisa dipanggil di index