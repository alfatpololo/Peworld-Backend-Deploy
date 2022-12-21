const experienceModel = require("../model/experience.model");
const { success, failed } = require("../helper/response");

const experienceController = {
  list: (req, res) => {
    experienceModel
      .getAllExperience()
      .then((result) => {
        success(res, result.rows, "success", "Get All Experience List Success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Failed to get all experience list");
      });
  },
  listByUser: (req, res) => {
    const id_user = req.params.id;
    experienceModel
      .getAllExperienceByUser(id_user)
      .then((result) => {
        success(
          res,
          result.rows,
          "success",
          "Get All Experience By User Success"
        );
      })
      .catch((err) => {
        failed(
          res,
          err.message,
          "failed",
          "Failed to get all experience by user"
        );
      });
  },
  detail: (req, res) => {
    const id_experience = req.params.id;
    experienceModel
      .getDetailExperience(id_experience)
      .then((result) => {
        success(res, result.rows, "success", "Get Detail experience success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Failed to get detail experience");
      });
  },
  destroy: (req, res) => {
    const id_experience = req.params.id;
    experienceModel
      .deleteExperience(id_experience)
      .then((result) => {
        success(res, result.rowCount, "success", "Delete experience Success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Failed to delete experience");
      });
  },
  insert: (req, res) => {
    try {
      const { id_user, job_title, company, date_in, date_out, description } = req.body;
      const data = {
        id_user,
        job_title,
        company,
        date_in,
        date_out,
        description,
      };
      experienceModel
        .insertExperience(data)
        .then((result) => {
          success(res, result.rows, "success", "Insert experience Success");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Failed to insert experience");
        });
    } catch (err) {
      console.log(err);
    }
  },
  updateExperience: (req, res) => {
    const id_experience = req.params.id;
    const { job_title, company, date_in, date_out, description } = req.body;
    const data = {
      id_experience,
      job_title,
      company,
      date_in,
      date_out,
      description,
    };
    experienceModel
      .updateExperience(data)
      .then((result) => {
        success(res, result.rowCount, "success", "Update experience Success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Failed to experience portofolio");
      });
  },
};

module.exports = experienceController;