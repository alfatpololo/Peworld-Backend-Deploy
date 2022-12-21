const userRecruitersModel = require('../model/user_recruiters.model')
const { success, failed } = require('../helper/response');

const userRecruitersController = {
  // metod
  listRecruiters: (req, res) => {
    userRecruitersModel.selectAllRecruiters()
      .then((results) => {
        success(res, results, 'success', 'get all user success')
      }).catch((err) => {
        failed(res, err.message, 'failed', 'get all user failed')
      })
  },
  detailRecruiters: (req, res) => {
    const id = req.params.id
    userRecruitersModel.selectDetailRecruiters(id).then((results) => {
      res.json(results.rows)
    }).catch((err) => {
      res.json(err)
    })
  },
  insertRecruiters: (req, res) => {
    const { username, phone, password } = req.body
    userRecruitersModel.store( username, phone, password).then((results) => {
      success(res, results, 'success', 'insert user success')
    }).catch((err) => {
      failed(res, err.message, 'failed', 'get all user failed')
    })
  },

  // update: (req, res) => {
  //   const {name, job_desk, city, description, tempat_kerja} = req.body
  //   const id = req.params.id
  //   // const image_user = req.file.filename
  //   const data = {id, name, job_desk, city, description, tempat_kerja}
  //   userModel.updateUser(id, name, job_desk, city, description, tempat_kerja)
  //   .then(async () => {
  //     const result = await userModel.updateUser(id);
  //     success(res, result.rows[0], "success", "data has been update");
  //     console.log(data)
  //   })
  //   .catch((err) => {
  //     failed(res, err.message, "failed", "internal server error");
  //   });
  // },

  updateRecruiters: (req, res) => {
    const id = req.params.id
    // const image=req.file.filename
    // eslint-disable-next-line camelcase
    const {companyname, field, city, description, email, instagram, phone, linkedin} = req.body
    let image_user 
    if (req.file) {
      image_user = req.file.filename
    }
    userRecruitersModel
      .updateUserRecruiters( id, companyname, field, city, description, email, instagram, phone, linkedin, image_user)
      .then((result) => {
        res.json('Account Updated')
        console.log(companyname)
      })
      .catch((err) => {
        res.json(err)
      })
  },
  
  destroyRecruiters: (req, res) => {
    const id = req.params.id
    userRecruitersModel.destroyRecruiters(id).then((results) => {
      success(res, results, 'success', 'delete user success')
    }).catch((err) => {
      failed(res, err.message, 'failed', 'get all user failed')
    })
  }
}

module.exports = userRecruitersController
