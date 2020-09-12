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
    avatarImagePath: {
        type: String
    },
    role: {
        type: String,
        required: true
    },
    token: {
        data: String,
        default: ''
    },
    resetPassToken: {
        data: String,
        default: ''
    },
    inCart: {
        type: Array,
        default: [],
    }
})

userSchema.pre('save', function() {
    if (this.avatarName != null) {
        return (
            this.avatarImagePath = 
                path.join('/', avatarImageBasePath, this.avatarName)
        )
    }
})

module.exports = mongoose.model('User', userSchema)
module.exports.avatarImageBasePath = avatarImageBasePath
