const mongoose = require('mongoose')
const path = require('path')

const avatarImageBasePath = 'Uploads/UserAvatars'

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
    avatarName: {
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

userSchema.virtual('avatarImagePath').get(function() {
    if (this.avatarName != null) {
        return path.join('/', avatarImageBasePath, this.avatarName)
    }
})

module.exports = mongoose.model('User', userSchema)
module.exports.avatarImageBasePath = avatarImageBasePath
