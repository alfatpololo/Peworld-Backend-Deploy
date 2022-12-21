// deklare express
const express = require('express')
const { list, detail, insert, update, destroy, filter} = require('../controller/user.controller')
const {register, login} = require('../controller/auth.controller')
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
  .get('/user/list', filter)
  .get('/user/search', filter)
  .get('/user/:id', detail)
  .post('/user', insert)
  .put('/user/update/:id', multerUpload.single("image_user"), update)
  .delete('/user/:id', destroy)

  //register
  .post('/register', register)
  //login
  .post('/login', login)

module.exports = router
