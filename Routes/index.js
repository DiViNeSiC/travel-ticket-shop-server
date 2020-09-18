const router = require('express').Router()
const Product = require('../Models/product')

router.get('/', async (req, res) => {
    const allProducts = await Product
        .find()
        .populate('creatorUser')
        .exec()

    const productLength = allProducts.length
    
    res.json({ allProducts, productLength })
})

module.exports = router