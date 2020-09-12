const bcrypt = require('bcrypt')
const User = require('../Models/user')
const path = require('path')

const deleteAvatar = require('../Handlers/FileHandlers/AvatarImages/deleteAvatar')

const getUserInformation = async (req, res) => {
    const user = await User.findById(req.payload.id)
    if (user == null) throw 'You Are Not Logged In But How?!'

    res.json({ user })
}

const updateUserInformation = async (req, res) => {
    const { name, lastname, username } = req.body
    const user = await User.findById(req.payload.id)
    const lowerCaseUsername = username.toLowerCase()
    
    const userExist = await User.findOne({ username: lowerCaseUsername })
    if (userExist && user.username !== lowerCaseUsername) 
        throw 'User With This Username Already Exist!'
    
    await user.updateOne({ name, lastname, username })

    res.json({ 
        user,
        message: `User ${user.username} Updated Successfully!`  
    })
}

const updateUserAvatar = async (req, res) => {
    const newAvatar = req.file != null ? req.file.filename : null
    const { id } = req.payload
    const user = await User.findById(id)
    const { avatarName } = user

    if (newAvatar == null) throw 'Avatar Field Is Empty'

    if (avatarName) {
        const { error } = deleteAvatar(avatarName, id, true)

        if (error) throw 'Cannot Update Avatar'
    }

    const avatarImagePath =  path.join('/', User.avatarImageBasePath, newAvatar)

    await user.updateOne({ avatarName: newAvatar, avatarImagePath })

    res.json({ 
        message: 'Avatar Updated'
    })
}

const updateUserPassword = async (req, res) => {
    const { newPass } = req.body
    const user = await User.findById(req.payload.id)
    if (user == null) throw 'You Are Not Logged In But How?!'
    
    const newHashedPassword = await bcrypt.hash(newPass.toString(), 10)

    await user.updateOne({ password: newHashedPassword })

    res.json({ 
        message: `User ${user.username} Successfully Updated Password` 
    })
}

const deleteUserAccount = async (req, res) => {
    const user = await User.findById(req.payload.id)
    const { _id, avatarName } = user
    const deleteAvatarTask = await deleteAvatar(avatarName, _id)
    const { taskMessage, error } = deleteAvatarTask

    if (error) throw taskMessage
    
    await user.deleteOne()

    res.json({ 
        message: `User ${user.username} Successfully Deleted Account` 
    })
}

const deleteUserAvatar = async (req, res) => {
    const user = await User.findById(req.payload.id)
    const { _id, avatarName } = user

    if (!avatarName) throw 'You Do Not Have An Avatar'

    const deleteAvatarTask = await deleteAvatar(avatarName, _id)
    const { taskMessage, error } = deleteAvatarTask

    if (error) throw taskMessage

    await user.updateOne({ avatarName: '', avatarImagePath: '' })

    res.json({ taskMessage })
}

module.exports = { 
    getUserInformation, 
    updateUserInformation, 
    updateUserAvatar,
    updateUserPassword, 
    deleteUserAccount,
    deleteUserAvatar 
}