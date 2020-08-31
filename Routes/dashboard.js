const router = require('express').Router()
const Product = require('../Models/product')
const searchFilter = require('../Middlewares/searchFilter')

router.get('/', searchFilter, async (req, res) => {
    const { name, lastname } = req.payload
    const allProducts = await Product.find(req.filteredProducts)
    const productLength = 
        allProducts.length > 0 ? 
        `${allProducts.length} Products` : 
        'Unfortunately We Have No Products Now'
    
    res.json({ 
        message: `Welcome ${name} ${lastname}`, allProducts, productLength 
    })
})

module.exports = router