const router = require('express').Router()
const Product = require('../Models/product')

router.get('/', async (req, res) => {
    const allProducts = await Product.find()
    const productLength = 
        allProducts.length > 0 ? 
        `${allProducts.length} Products` : 
        'Unfortunately We Have No Products Now'
    
    res.json({ allProducts, productLength })
})

module.exports = router