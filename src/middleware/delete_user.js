const fs = require("fs");
const userModel = require("../model/user.model");

const remove = async (req, res, next) => {
  const id = req.params.id;
  const data = await userModel.selectDetail(id);
  if (data) {
    if (data.rows[0].image_user) {
      const img = data.rows[0].image_user;
      if (img !== "Ellipse326.png") {
        fs.unlink(`./public/${img}`, (err) => {
          if (err) {
            res.json({
              message: "delete failed",
              error: err,
            });
          }
        });
      }
      next();
    } else {
      res.json("There is no profile picture");
    }
  } else {
    res.json("Airline ID is not found");
  }
};

module.exports = remove;