const User = require('../../Models/user')
const Product = require('../../Models/product')

module.exports = async (req, res, next) => {
    const { productId } = req.params

    const product = await Product.findById(productId)
    if (product == null) throw 'Product Not Found'

    const user = await User.findById(req.payload.id)
    const userCart = user.inCart

    const isProductExist = userCart.find(product => 
        product.productId === productId
    )

    if (!isProductExist) throw 'Product Is Not In Your Cart'

    const newCart = userCart.filter(product => product.productId !== productId)

    await user.updateOne({ inCart: newCart })

    req.newCart = newCart
    req.message = `Product ${product.title} Removed From Cart`
    next()
} 