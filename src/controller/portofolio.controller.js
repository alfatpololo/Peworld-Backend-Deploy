const portofolioModel = require("../model/portofolio.model");
const { success, failed } = require("../helper/response");
const cloudinary = require("../helper/cloudinary")
const portfolioController = {
  list: (req, res) => {
    portofolioModel
      .getAllPortofolio()
      .then((result) => {
        success(res, result.rows, "success", "Get All Flight List Success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Failed to get all flight list");
      });
  },

  listByUser: (req, res) => {
    const id_user = req.params.id;
    portofolioModel
      .getAllPortofolioByUser(id_user)
      .then((result) => {
        success(
          res,
          result.rows,
          "success",
          "Get All Portofolio By User Success"
        );
      })
      .catch((err) => {
        failed(
          res,
          err.message,
          "failed",
          "Failed to get all Portofolio by user"
        );
      });
  },
  detail: (req, res) => {
    const id_portofolio = req.params.id;
    portofolioModel
      .getDetailPortofolio(id_portofolio)
      .then((result) => {
        success(res, result.rows, "success", "Get Detail portofolio success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Failed to get detail portofolio");
      });
  },
  destroy: (req, res) => {
    const id_portofolio = req.params.id;
    portofolioModel
      .deletePortofolio(id_portofolio)
      .then((result) => {
        success(res, result.rowCount, "success", "Delete portofolio Success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Failed to delete portofolio");
      });
  },
  insert: async (req, res) => {
    try {
      const { id_user, title_portofolio, link, type } = req.body;
      const image = await cloudinary.uploader.upload(req.file.path);
      const data = {
        id_user,
        title_portofolio,
        image: image.secure_url,
        link,
        type,
      };
      portofolioModel
        .insertPortofolio(data)
        .then((result) => {
          success(res, result.rows, "success", "Insert portofolio Success");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Failed to insert portofolio");
        });
    } catch (err) {
      console.log(err);
    }
  },
  updatePortofolio: (req, res) => {
    const id_portofolio = req.params.id;
    const image = req.file.filename;
    const { title_portofolio, link, type } = req.body;
    const data = {
      id_portofolio,
      title_portofolio,
      image,
      link,
      type,
    };
    portofolioModel
      .updatePortofolio(data)
      .then((result) => {
        success(res, result.rowCount, "success", "Update portofolio Success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Failed to update portofolio");
      });
  },
};

module.exports = portfolioController;