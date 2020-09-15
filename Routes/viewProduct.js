const router = require('express').Router()
const { getOneProduct } = require('../Controllers/productController') 
const { catchErrors } = require('../Handlers/errorHandler')
const incrementView = require('../Middlewares/incrementView')

router.get(
    '/:id', 
    catchErrors(incrementView), 
    catchErrors(getOneProduct)
)

module.exports = router