// deklare express
const express = require('express')
const { listRecruiters, detailRecruiters, insertRecruiters, updateRecruiters, destroyRecruiters, } = require('../controller/user_recruiters.controller')
const {registerRecruiters, loginRecruiters} = require('../controller/auth_recruiters.controller')
const router = express.Router()

const jwtAuth = require('../middleware/jwtAuth');
const {isAdmin, isCustomer} = require('../middleware/authorization');
const multerUpload = require('../middleware/upload_user');
const deleteFile = require('../middleware/delete_user');
// router
// .get('/', (req, res) => {
//     const data = [1,2,3,4]
//     res.json(data);
// })

router
  .get('/userrecruiters/list', listRecruiters)
  .get('/userrecruiters/:id', detailRecruiters)
  .post('/userrecruiters', insertRecruiters)
  .put('/userrecruiters/update/:id', multerUpload.single("image_recruiters"), updateRecruiters)
  .delete('/userrecruiters/:id', destroyRecruiters)

  //register
  .post('/registerrecruiters', registerRecruiters)
  //login
  .post('/loginrecruiters', loginRecruiters)

module.exports = router