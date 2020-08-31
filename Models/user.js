const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        minlength: 5,
        required: 'Username Is Required'
    },
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        lowercase: true,
        required: 'Email Is Required'
    },
    password: {
        type: String,
        required: 'Password Is Required'
    },
    profileImage: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    resetPassToken: {
        data: String,
        default: ''
    }
})

module.exports = mongoose.model('User', userSchema)