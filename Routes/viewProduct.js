const router = require('express').Router()
const { getOneProduct } = require('../Controllers/productController') 
const { catchErrors } = require('../Handlers/errorHandler')

router.get('/:id', catchErrors(getOneProduct))

module.exports = router