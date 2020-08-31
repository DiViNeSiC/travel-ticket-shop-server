const multer = require('multer')
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/jpg']
const uploadBasePath = require('../Handlers/fileHandlers/uploadBasePath')

const upload = multer({
    dest: uploadBasePath,
    fileFilter: (req, file, callback) => { 
        callback(null, imageMimeTypes.includes(file.mimetype)) 
    }
})

module.exports = upload