const router = require('express').Router()
const { catchErrors } = require('../Handlers/errorHandler')
const searchFilter = require('../Middlewares/searchFilter')
const upload = require('../Middlewares/Uploads/productImageUpload')
const { 
    getAllProducts, 
    createProduct,
    getOneProduct, 
    editProduct, 
    deleteProduct,
    deleteProductImage
} = require('../Controllers/productController') 



router.get('/', searchFilter, catchErrors(getAllProducts))
router.post('/', upload.array('productImages', 12), catchErrors(createProduct))

router.get('/:id', catchErrors(getOneProduct))
router.put('/:id', upload.array('productImages', 12), catchErrors(editProduct))

router.delete('/:id', catchErrors(deleteProduct))
router.delete('/:id/:filename', catchErrors(deleteProductImage))

module.exports = router