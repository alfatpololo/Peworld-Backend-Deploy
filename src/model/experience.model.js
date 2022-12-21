const db = require("../config/db");
const experienceModel = {
  //get all experience
  getAllExperience: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM  job_experience join user_workers on job_experience.id_user = user_workers.id;`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  //get all experience berdasarkan experience
  getAllExperienceByUser: (id_user) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM job_experience join user_workers on job_experience.id_user = user_workers.id WHERE job_experience.id_user = ${id_user};`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  //get detail experience
  getDetailExperience: (id_experience) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM job_experience join user_workers on job_experience.id_user = user_workers.id WHERE id_experience='${id_experience}';`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  //delete experience
  deleteExperience: (id_experience) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM job_experience WHERE id_experience='${id_experience}'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  //insert experience
  insertExperience: (data) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO job_experience (id_user, job_title, company, date_in, date_out, description) VALUES (${data.id_user}, '${data.job_title}', '${data.company}', '${data.date_in}', '${data.date_out}', '${data.description}');`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  //update experience
  updateExperience: ({
    id_experience,
    job_title,
    company,
    date_in,
    date_out,
    description,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE job_experience SET
            job_title = COALESCE($1, job_title),
            company = COALESCE($2, company),
            date_in = COALESCE($3, date_in),
            date_out = COALESCE($4, date_out),
            description = COALESCE($5, description)
            WHERE id_experience = $6`,
        [job_title, company, date_in, date_out, description, id_experience],
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
module.exports = experienceModel;
