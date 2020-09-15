const User = require('../../Models/user')
const Product = require('../../Models/product')

module.exports = async (req, res, next) => {
    const { quantity } = req.body
    const { productId } = req.params

    const product = await Product.findById(productId)
    if (product == null) throw 'Product Not Found'

    const user = await User.findById(req.payload.id)
    const isProductExist = user.inCart.find(product => 
        product.productId === productId
    )

    if (!isProductExist) throw 'Product Is Not In Your Cart'
    
    await user.updateOne(
        { $set: { "inCart.$[elem].quantity": quantity } },
        { 
            multi: false,
            arrayFilters: [{ "elem.productId": productId }]
        }
    )

    req.newCart = await (await User.findById(req.payload.id)).inCart
    req.message = `Product ${product.title} Changed Quantity To ${quantity}`
    
    next()
} 