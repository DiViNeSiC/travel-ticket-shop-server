const Product = require('../Models/product')
const User = require('../Models/user')

module.exports = async (req, res, next) => {
    try {
        const user = await User.findById(req.payload.id)
        if (user == null) throw 'User Not Found'

        const { inCart } = user
        if (!inCart.length) throw 'Cart Is Empty'

        for(let i = 0; i < inCart.length; i++) {
            const { quantity, productId } = inCart[i]

            const product = await Product.findById(productId)

            await product.updateOne({ 
                sold: quantity
            })
        }

        next()
    } catch (err) {
        res.status(500).json({ 
            message: 'Something Went Wrong', 
            error: err.message 
        })
    }
}