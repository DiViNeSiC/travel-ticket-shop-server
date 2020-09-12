const router = require('express').Router()
const { getAllProducts, getCartProducts } = require('../Controllers/dashboardController')
const { catchErrors } = require('../Handlers/errorHandler')

router.get('/', catchErrors(getAllProducts))

router.get('/cart', catchErrors(getCartProducts))

module.exports = router