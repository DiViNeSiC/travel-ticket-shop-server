const Product = require('../Models/product')

module.exports = (req, res, next) => {
    const { 
        title, 
        priceGreaterThan, 
        priceLessThan, 
        continent, 
        order, 
        limit 
    } = req.query

    const greaterThan = priceGreaterThan ? parseInt(priceGreaterThan) : 0
    const lessThan = priceLessThan ? parseInt(priceLessThan) : Infinity
    const continentFilter = continent ? parseInt(continent) : null
    const limitFilter = limit ? parseInt(limit) : 12
    
    try {
        let products = Product
            .find()
            .regex('title', new RegExp(title, 'i'))
            .gte('price', greaterThan)
            .lte('price', lessThan)
            .sort({ title: order })     
            .limit(limitFilter)     
            
        if (continentFilter != null) {
            products = products.find({ continent: continentFilter })
        }
        
        req.filteredProducts = products
        next()
    } catch (err) {
        res.status(400).json({ 
            message: 'Something Went Wrong!', 
            error: err.message 
        })
    }
}