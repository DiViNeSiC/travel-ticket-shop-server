const Product = require('../Models/product')

module.exports = async (req, res, next) => {
    let product
    try {
        product = await Product.findById(req.params.id)
        if (product == null) 
            return res
                .status(404)
                .json({ 
                    message: 'Product Not Found', 
                })

        let newViews = product.views + 1

        await product.updateOne({ views: newViews })

        next()
    } catch (err) {
        if (product == null) 
            return res
                .status(404)
                .json({ 
                    message: 'Product Not Found', 
                })

        res.status(500).json({ 
            message: 'Something Went Wrong', 
            error: err.message 
        })
    }
}