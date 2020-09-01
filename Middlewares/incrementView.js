const Product = require('../Models/product')

module.exports = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id)
        let newViews = product.views + 1

        await product.updateOne({ views: newViews })

        next()
    } catch (err) {
        res.status(500).json({ 
            message: 'Something Went Wrong', 
            error: err.message 
        })
    }
}