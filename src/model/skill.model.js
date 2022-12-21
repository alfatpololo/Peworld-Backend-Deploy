const db = require("../config/db");
const skillModel = {
  //get all skill
  getAllSkill: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM skill join user_workers on skill.id_user = user_workers.id;`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  //get all skill berdasarkan user
  getAllSkillByUser: (id_user) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM skill join user_workers on skill.id_user = user_workers.id WHERE skill.id_user = ${id_user};`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  //get detail skill
  getDetailSkill: (id_skill) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM skill join user_workers on skill.id_user = user_workers.id WHERE id_skill='${id_skill}';`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  //delete skill
  deleteSkill: (id_skill) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM skill WHERE id_skill='${id_skill}'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  //insert skill
  insertSkill: (data) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO skill (id_user, skill) VALUES (${data.id_user}, '${data.skill}');`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  //update skill
  updateSkill: ({
    id_skill,
    skill
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE skill SET 
        skill = COALESCE($1, skill), 
        WHERE id_skill = $2`,
        [skill, id_skill],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
};

module.exports = skillModel;
