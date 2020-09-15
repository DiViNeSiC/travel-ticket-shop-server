const router = require('express').Router()
const upload = require('../Middlewares/Uploads/productImageUpload')
const { catchErrors } = require('../Handlers/errorHandler')
const { 
    getAllProducts, 
    createProduct,
    getOneProduct, 
    editProduct, 
    uploadNewImage,
    deleteProduct,
    deleteProductImage
} = require('../Controllers/productController') 



router.get('/', catchErrors(getAllProducts))
router.post('/', upload.array('productImages', 12), catchErrors(createProduct))
router.post('/:id', upload.single('productImage'), catchErrors(uploadNewImage))

router.get('/:id', catchErrors(getOneProduct))
router.put('/:id', catchErrors(editProduct))

router.delete('/:id', catchErrors(deleteProduct))
router.delete('/:id/:filename', catchErrors(deleteProductImage))

module.exports = router