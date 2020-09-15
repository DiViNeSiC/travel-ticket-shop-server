const Product = require('../Models/product')
const User = require('../Models/user')

const getAllProducts = async (req, res) => {
    const allProducts = await Product.find()
    const productLength = allProducts.length 
    
    res.json({ 
        user: req.payload, allProducts, productLength 
    })
}

const getCartProducts = async (req, res) => {
    const user = await User.findById(req.payload.id)
    const productIds = user.inCart.map(product => product.productId)
    
    const cartProducts = await Product
        .find()
        .where('_id')
        .in(productIds)
        .exec();

    res.json({ userCart, cartProducts })
}

module.exports = { getAllProducts, getCartProducts }
