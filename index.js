const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')
const morgan = require('morgan')
// buat route
const userRouter = require('./src/router/user.routes')
const userRecruiters = require('./src/router/user_recruiters.routes')
const portofolioRouter = require('./src/router/portofolio.routes')
const experienceRouter = require('./src/router/experience.routes')
const skillRouter = require('./src/router/skill.routes')


const app = express()
app.use(express.static('public'))
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(bodyParser.json())
app.use(xss())
app.use(cors())
app.use(morgan('dev'))
app.use(userRouter)
app.use(userRecruiters)
app.use(portofolioRouter)
app.use(experienceRouter)
app.use(skillRouter)
// jalankan express
app.listen(3001, () => {
  console.log('SERVICE RUNNING ON PORT 3001')
})