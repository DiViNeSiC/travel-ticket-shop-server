const path = require('path')
const User = require('../../../Models/user')
const avatarImageBasePath = path.join('public', User.avatarImageBasePath)

module.exports = avatarImageBasePath