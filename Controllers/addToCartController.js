const User = require('../Models/user')
const Product = require('../Models/product')
const Payment = require('../Models/payment')

const addToCart = async (req, res) => {
    const { quantity } = req.body
    const { productId } = req.params

    const product = await Product.findById(productId)
    if (product == null) throw 'Product Not Found'

    const user = await User.findById(req.payload.id)
    const userCart = user.inCart

    const isProductExist = userCart.find(product => 
        product.productId === productId
    )

    if (isProductExist) throw 'Product Is Already In Your Cart'

    const newProduct = { quantity, productId }

    const newCart = [...userCart, newProduct]

    await user.updateOne({ inCart: newCart })

    res.json({ 
        message: `Product ${product.title} Added To Cart`
    })
}

const getProducts = async (req, res) => {
    const message = req.message
    const newCart = req.newCart
    
    if (newCart == null) {
        return res.json({
            message,
            newCart,
            cartProducts: []
        })
    }
    
    const productIds = newCart.map(product => product.productId)

    const cartProducts = await Product
        .find()
        .where('_id')
        .in(productIds)
        .exec();

    res.json({
        message,
        newCart,
        cartProducts
    })
}

const successPurchase = async (req, res) => {
    const { payment } = req.body
    if (payment == null) throw 'No Information Received'
    
    const {
        payerID,
        paymentID,
        paymentToken,
        returnUrl,
        address,
        email
    } = payment

    const paymentInfo = new Payment({ 
        payerID,
        paymentID,
        paymentToken,
        returnUrl,
        address,
        email
    })

    await paymentInfo.save()

    res.json({ 
        message: `Thanks For Your Purchase Enjoy Your Travel! :)`
    })
}

module.exports = { addToCart, getProducts, successPurchase }