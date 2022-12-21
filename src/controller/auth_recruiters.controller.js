const userRecruitersModel = require('../model/user_recruiters.model');
const {success, failed, succesWithToken} = require('../helper/response')

//declare bcrypt

const bcrypt = require('bcrypt');
const jwtToken = require('../helper/generateJWT');

module.exports = {
    registerRecruiters: (req, res) => {
        try {
        //tangkap data dari body
        const {companyname, password, email, company, position, phone} = req.body;
        bcrypt.hash(password, 10, (err, hash) => {
            console.log(hash)
            if(err){
                failed(res, err.message, 'failed', 'failed hash password');
            }

            const data = {
                companyname,
                password: hash,
                email,
                company,
                position,
                phone,
                image_recruiters: req.file ? req.file.filename : "Ellipse326.png",
            }

            userRecruitersModel.registerRecruiters(data).then((result) => {
                success(res, result, 'success', 'register success')

            }).catch((err) => {
                failed(res, err.message, 'failed', 'register failed')
            })
        })
    } catch {
        failed(res, err.message, 'failed', 'internal server error');
    }
    },

    loginRecruiters: async (req, res) => {
        const {email, password} = req.body;
        userRecruitersModel.checkUsernameRecruiters(email).then((result) => {
            // console.log(res.rows[0]);
            const user = result.rows[0];
            if(result.rowCount > 0) {
                bcrypt.compare(password, result.rows[0].password).then(async (result) => {
                    if(result) {
                        const token = await jwtToken({
                            email: user.email,
                        })
                        console.log(token);
                        succesWithToken(res, {token, data:user}, "success", "login success");
                    } else {
                        // ketika password salah
                        failed(res, null, 'failed', 'email or password is wrong');
                    }
                })
            } else {
                //ketika username salah
                failed(res, null, 'failed', 'username or password is wrong');
            }
        }).catch((err) => {
            failed(res, err, 'failed', 'internal server error');
        })
    }
}