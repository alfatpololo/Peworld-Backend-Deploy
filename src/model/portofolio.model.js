const db = require("../config/db");
const portofolioModel = {
  //get all portofolio
  getAllPortofolio: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM portofolio join user_workers on portofolio.id_user = user_workers.id;`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  //get all portofolio berdasarkan user
  getAllPortofolioByUser: (id_user) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM portofolio join user_workers on portofolio.id_user = user_workers.id WHERE portofolio.id_user = ${id_user};`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  //get detail portofolio
  getDetailPortofolio: (id_portofolio) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM portofolio join user_workers on portofolio.id_user = user_workers.id WHERE id_portofolio='${id_portofolio}';`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  //delete portofolio
  deletePortofolio: (id_portofolio) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM portofolio WHERE id_portofolio='${id_portofolio}'`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  //insert portofolio
  insertPortofolio: (data) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO portofolio (id_user, title_portofolio, image, link, type) VALUES (${data.id_user}, '${data.title_portofolio}', '${data.image}', '${data.link}', '${data.type}');`,
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },

  //update portofolio
  updatePortofolio: ({
    id_portofolio,
    title_portofolio,
    image,
    link,
    type,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE portofolio SET 
        title_portofolio = COALESCE($1, title_portofolio), 
        image = COALESCE($2, image), 
        link = COALESCE($3, link), 
        type = COALESCE($4, type)
        WHERE id_portofolio = $5`,
        [title_portofolio, image, link, type, id_portofolio],
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

module.exports = portofolioModel;
