const mongoose = require('mongoose')
const path = require('path')

const productImageBasePath = 'Uploads/ProductImages'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title Is Required'
    },
    price: {
        type: Number,
        required: 'Price Is Required'
    },
    creatorUser: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    description: {
        type: String
    },
    productImageNames: {
        type: Array,
        maxlength: 12,
        default: []
    },
    continent: {
        type: Number,
        required: true,
        default: 1
    },
    sold: {
        type: Number,
        maxlength: 150,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    imagePaths: {
        type: Array, 
        maxlength: 12,
        default: []
    }
}, { timestamps: true })

productSchema.pre('save', function() {
    if (this.productImageNames != null && this.title != null) {
        return this.imagePaths = this.productImageNames.map(name => 
            path.join('/', productImageBasePath, name)
        )
    }
})

module.exports = mongoose.model('Product', productSchema)
module.exports.productImageBasePath = productImageBasePath