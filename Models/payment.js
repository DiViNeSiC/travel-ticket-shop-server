const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    payerID: {
        type: String,
        required: true
    },
    paymentID: {
        type: String,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    paymentToken: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Payment', paymentSchema)