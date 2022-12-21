const db = require('../config/db')

const userRecruitersModel = {
  // router list
  selectAllRecruiters: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM user_recruiters', (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },
  // router details
  selectDetailRecruiters: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM user_recruiters WHERE id_recruiter=${id}`, (err, res) => {
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
  registerRecruiters: ({companyname, password, email, company, position, phone, image_recruiters}) => {
    return new Promise ((resolve, reject) => {
      db.query(`
            INSERT INTO user_recruiters (companyname, password, email, company, position, phone, image_recruiters)
            VALUES
            ('${companyname}', '${password}', '${email}', '${company}', '${position}', '${phone}', '${image_recruiters}')
            `, (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      })
    })
  },

  // model login
  checkUsernameRecruiters: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM user_recruiters WHERE email = '${email}'`, (err, res) => {
        if(err) {
          reject(err)
        }
        resolve(res);
      })
    })
  },
  
  updateUserRecruiters: (id, companyname, field, city, description, email, instagram, phone, linkedin, image_recruiters) => {
    return new Promise ((resolve, reject) => {
      db.query(`UPDATE user_recruiters SET
        companyname = COALESCE ($1, companyname),
        field = COALESCE ($2, field),
        city = COALESCE ($3, city),
        description = COALESCE ($4, description),
        email = COALESCE ($5, email),
        instagram = COALESCE ($6, instagram),
        phone = COALESCE ($7, phone),
        linkedin = COALESCE ($8, linkedin),
        image_recruiters = COALESCE ($9, image_recruiters)
        WHERE id_recruiter = $10
        `,
        [companyname, field, city, description, email, instagram, phone, linkedin, image_recruiters, id]
      
            , (err, res) => {
              if (err) {
                reject(err)
              }
                resolve(res)
        })
    })
  },
  destroyRecruiters: (id) => {
    return new Promise ((resolve, reject) => {
      db.query(`
            DELETE FROM user_recruiters where id_recruiter=${id}
            `, (err, res) => {
              if (err) {
                reject(err)
              }
                resolve(res)
        })
    })
  },
}

module.exports = userRecruitersModel