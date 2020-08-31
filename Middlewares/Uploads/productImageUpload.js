const multer = require('multer')
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/jpg']
const productImageBasePath = require('../../Handlers/FileHandlers/ProductImages/productImageBasePath')

const uploadProductImage = multer({
    dest: productImageBasePath,
    fileFilter: (req, file, callback) => { 
        callback(null, imageMimeTypes.includes(file.mimetype)) 
    }
})

module.exports = uploadProductImage