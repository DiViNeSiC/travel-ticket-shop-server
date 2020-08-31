const path = require('path')
const Product = require('../../Models/product')
const uploadBasePath = path.join('public', Product.productImageBasePath)

module.exports = uploadBasePath