const fs = require("fs");
const portofolioModel = require("../model/portofolio.model");

const remove = async (req, res, next) => {
  const id_portofolio = req.params.id;
  const data = await portofolioModel.getDetailPortofolio(id_portofolio);
  if (data.rows[0].image) {
    const img = data.rows[0].image;
    fs.unlink(`./public_portfolio/${img}`, (err) => {
      if (err) {
        console.log(err);
        next();
      }
    });
    next();
  } else {
    res.json("Not found image");
  }
};

module.exports = remove;