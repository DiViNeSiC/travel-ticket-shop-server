const path = require('path')
const Product = require('../../../Models/product')
const productImageBasePath = path.join('public', Product.productImageBasePath)

module.exports = productImageBasePath