const Product = require('../Models/product')
const User = require('../Models/user')

const deleteOneFile = require('../Handlers/fileHandlers/ProductImages/deleteOneFile')
const deleteAllFiles = require('../Handlers/fileHandlers/ProductImages/deleteAllFiles')
const updateImages = require('../Handlers/fileHandlers/ProductImages/updateImages')

const getAllProducts = async (req, res) => {
    const creatorUser = await User.findById(req.payload.id)
    const allProducts = await Product.find({ creatorUser })
    const productLength = allProducts.length
    
    res.json({ allProducts, productLength })
}

const createProduct = async (req, res) => {
    const productImageNames = req.files != null ? 
        req.files.map(file => file.filename) : null

    const { title, price, description, continent } = req.body
    const creatorUser = await User.findById(req.payload.id)

    if (creatorUser == null) throw 'You Are Not Logged In'

    const newProduct = new Product({ 
        title, price, description, 
        continent, productImageNames, creatorUser
    })

    await newProduct.save()

    res.json({
        newProduct,
        message: `Product ${newProduct.title} Has Successfully Created` 
    })
}

const getOneProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product == null) throw 'There Is No Valid Product With This Id'

    res.json({ product })
}

const editProduct = async (req, res) => {
    const newProductImageNames = req.files != null ? 
        req.files.map(file => file.filename) : null

    const { title, price, description, continent } = req.body
    const { id } = req.params

    const product = await Product.findById(id)
    if (product == null) throw 'No Product Found!'

    const { productImageNames } = product
    
    const newImageNames = updateImages(productImageNames, newProductImageNames)

    await product.updateOne({ 
        title,
        price,
        description,
        continent,
        productImageNames: newImageNames
    })

    res.json({ message: `Product ${product.title} Has Been Updated` })
}

const deleteProduct = async (req, res) => {
    const currentProduct = await Product.findById(req.params.id)
    if (currentProduct == null) throw 'No Product Found!'

    const { productImageNames } = currentProduct
    
    const deletePicsTask = await deleteAllFiles(productImageNames)
    const { taskMessage, error } = deletePicsTask
    
    if (error) throw taskMessage

    await currentProduct.remove()

    res.json({
        message: `Product ${currentProduct.title} Successfully Deleted`,
        taskMessage
    })
}

const deleteProductImage = async (req, res) => {
    const { filename, id } = req.params

    const deletePicTask = await deleteOneFile(filename, id)
    const { taskMessage, error } = deletePicTask

    if (error) throw taskMessage

    res.json({ taskMessage })
}

module.exports = {
    getAllProducts, 
    createProduct,
    getOneProduct, 
    editProduct, 
    deleteProduct,
    deleteProductImage
}