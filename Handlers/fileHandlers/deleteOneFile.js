const path = require('path')
const fs = require('fs')
const uploadBasePath = require('./uploadBasePath')
const Product = require('../../Models/product')

const deleteOneFile = async (filename, productId) => {
    let taskMessage
    let error = false

    const product = await Product.findById(productId)
    if (product == null) { 
        error = true
        taskMessage = 'No Product Found'
        return { taskMessage, error }
    }

    const { productImageNames } = product
    if (!productImageNames.includes(filename)) {
        error = true
        taskMessage = 'No Image Found'
        return { taskMessage, error }
    }

    const filePath = path.join(uploadBasePath, filename)

    const newProductImageNames = productImageNames
        .filter(imageName => imageName !== filename)

    fs.unlink(filePath, async (err) => {
        if (err) {
            error = true 
            taskMessage = `Cannot Remove The File ${err.message}`
            return { taskMessage, error }
        }
        await product.updateOne({ 
            productImageNames: newProductImageNames 
        })  
    })

    taskMessage = `Image ${filename} Deleted Successfully`
    
    return { taskMessage, error }
}

module.exports = deleteOneFile