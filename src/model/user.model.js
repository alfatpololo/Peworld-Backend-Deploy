const db = require('../config/db')

const userModel = {
  // router list
  selectAll: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM user_workers', (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  filterAll: (search, sortBy, sortOrder, limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM user_workers WHERE name ILIKE '%${search}%' ORDER BY ${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // router details
  selectDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM user_workers WHERE id=${id}`, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // router insert
  store: (username, phone, password) => {
    return new Promise((resolve, reject) => {
      db.query(`
            INSERT INTO users (username, phone, password)
            VALUES
            ('${username}', '${phone}', '${password}')
            `, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },

  //model register
  register: ({name, password, email, phone, image_user}) => {
    return new Promise ((resolve, reject) => {
      db.query(`
            INSERT INTO user_workers (name, password, email, phone, image_user)
            VALUES
            ('${name}', '${password}', '${email}', '${phone}', '${image_user}')
            `, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },

  // model login
  checkUsername: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM user_workers WHERE email = '${email}'`, (err, res) => {
        if(err) {
          reject(err)
        }
        resolve(res);
      })
    })
  },
  
  updateUser: (id, name, job_desk, city, description, tempat_kerja, image_user) => {
    return new Promise ((resolve, reject) => {
      db.query(`UPDATE user_workers SET
        name = COALESCE ($1, name),
        job_desk = COALESCE ($2, job_desk),
        city = COALESCE ($3, city),
        description = COALESCE ($4, description),
        tempat_kerja = COALESCE ($5, tempat_kerja),
        image_user = COALESCE ($6, image_user)
        WHERE id = $7
        `,
        [name, job_desk, city, description, tempat_kerja, image_user, id]
      
            , (err, res) => {
              if (err) {
                reject(err)
              }
                resolve(res)
        })
    })
  },
  countUser: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT COUNT(*) AS total FROM user_workers", (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },
  destroy: (id) => {
    return new Promise ((resolve, reject) => {
      db.query(`
            DELETE FROM user_workers where id=${id}
            `, (err, res) => {
              if (err) {
                reject(err)
              }
                resolve(res)
        })
    })
  },
}

module.exports = userModel