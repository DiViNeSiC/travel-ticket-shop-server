const multer = require('multer')
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/jpg']
const avatarImageBasePath = require('../../Handlers/FileHandlers/AvatarImages/avatarImageBasePath')

const uploadAvatar = multer({
    dest: avatarImageBasePath,
    fileFilter: (req, file, callback) => { 
        callback(null, imageMimeTypes.includes(file.mimetype)) 
    }
})

module.exports = uploadAvatar