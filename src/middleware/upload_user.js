//import multer

const multer = require('multer');
//import path
const path = require('path');

//management file
const multerUpload = multer ({
    storage: multer.diskStorage({
        
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);

        const filename = Date.now() + '' + ext;
        cb(null, filename);
    }
    }),

    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        console.log(ext);
        if(ext === '.jpg' || ext === '.png') {
            cb(null, true)
        }else{
            const error = {
                message: 'File musts be jpg or png'
            }
            cb(error, false)
        }
    },
//   Size file max 2MB compare to characters
  limits: { fileSize: 2097152 },
})

//midleware
const upload_user = (req, res, next) => {
    const multerSingle = multerUpload.single('image_user')
    multerSingle(req, res, (err) => {
        if(err){
            res.json({
                message: 'err',
                error: err
            })
        }else{
            next()
        }
    });
}
const upload_company = (req, res, next) => {
    const multerSingle = multerUpload.single('image_recruiters')
    multerSingle(req, res, (err) => {
        if(err){
            res.json({
                message: 'err',
                error: err
            })
        }else{
            next()
        }
    });
}

module.exports = multerUpload