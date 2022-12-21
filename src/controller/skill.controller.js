const skillModel = require("../model/skill.model");
const { success, failed } = require("../helper/response");

const skillController = {
  list: (req, res) => {
    skillModel
      .getAllSkill()
      .then((result) => {
        success(res, result.rows, "success", "Get All Skill List Success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Failed to get all Skill list");
      });
  },

  listByUser: (req, res) => {
    const id_user = req.params.id;
    skillModel
      .getAllSkillByUser(id_user)
      .then((result) => {
        success(
          res,
          result.rows,
          "success",
          "Get All Skill By User Success"
        );
      })
      .catch((err) => {
        failed(
          res,
          err.message,
          "failed",
          "Failed to get all Skill by user"
        );
      });
  },
  detail: (req, res) => {
    const id_skill = req.params.id;
    skillModel
      .getDetailSkill(id_skill)
      .then((result) => {
        success(res, result.rows, "success", "Get Detail skill success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Failed to get skill portofolio");
      });
  },
  destroy: (req, res) => {
    const id_skill = req.params.id;
    skillModel
      .deleteSkill(id_skill)
      .then((result) => {
        success(res, result.rowCount, "success", "Delete portofolio Success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Failed to delete portofolio");
      });
  },
  insert: (req, res) => {
    try {
      const { id_user, skill } = req.body;
      const data = {
        id_user,
        skill
      };
      skillModel
        .insertSkill(data)
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
  updateSkill: (req, res) => {
    const id_skill = req.params.id;
    const { skill } = req.body;
    const data = {
      id_skill,
      skill
    };
    skillModel
      .updateSkill(data)
      .then((result) => {
        success(res, result.rowCount, "success", "Update portofolio Success");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "Failed to update portofolio");
      });
  },
};

module.exports = skillController;