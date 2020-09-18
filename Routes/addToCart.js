const router = require('express').Router()
const { addToCart, getProducts, successPurchase } = require('../Controllers/addToCartController')
const { catchErrors } = require('../Handlers/errorHandler')
const deleteOne = require('../Middlewares/cart/deleteOne')
const deleteAll = require('../Middlewares/cart/deleteAll')
const changeQuantity = require('../Middlewares/cart/changeQuantity')
const incrementSold = require('../Middlewares/incrementSold')
const clearCart = require('../Middlewares/clearCart')

router.post('/add/:productId', catchErrors(addToCart))

router.post(
    '/success-purchase', 
    catchErrors(incrementSold), 
    catchErrors(clearCart),
    catchErrors(successPurchase)
)

router.put(
    '/change-quantity/:productId', 
    catchErrors(changeQuantity),
    catchErrors(getProducts)
)

router.delete(
    '/delete', 
    catchErrors(deleteAll),
    catchErrors(getProducts)
)

router.delete(
    '/delete/:productId', 
    catchErrors(deleteOne),
    catchErrors(getProducts)
)

module.exports = router