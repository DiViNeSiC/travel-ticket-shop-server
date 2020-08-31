const bcrypt = require('bcrypt')
const User = require('../Models/user')
const deleteAvatar = require('../Handlers/FileHandlers/AvatarImages/deleteAvatar')

const getUserInformation = async (req, res) => {
    const user = await User.findById(req.payload.id)
    if (user == null) throw 'You Are Not Logged In But How?!'

    res.json({ user })
}

const updateUserInformation = async (req, res) => {
    const { name, lastname, username } = req.body
    const user = await User.findById(req.payload.id)
    const { avatarName, _id } = user
    const lowerCaseUsername = username.toLowerCase()
    
    const userExist = await User.findOne({ username: lowerCaseUsername })
    if (userExist && user.username !== lowerCaseUsername) 
        throw 'User With This Username Already Exist!'
    
    if (avatarName != null && req.file != null) { 
        const deleteAvatarTask = await deleteAvatar(avatarName, _id, true)
        const { taskMessage, error } = deleteAvatarTask

        if (error) throw taskMessage
    }
    
    const avatarFile = req.file != null ? req.file.filename : avatarName

    await user.updateOne({ name, lastname, username, avatarName: avatarFile })

    res.json({ 
        user,
        message: `User ${user.username} Updated Successfully!`  
    })
}

const updateUserPassword = async (req, res) => {
    const { newPassword } = req.body
    const user = await User.findById(req.payload.id)
    if (user == null) throw 'You Are Not Logged In But How?!'

    const newHashedPassword = await bcrypt.hash(newPassword, 10)

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
    const deleteAvatarTask = await deleteAvatar(avatarName, _id)
    const { taskMessage, error } = deleteAvatarTask

    if (error) throw taskMessage

    res.json({ taskMessage })
}

module.exports = { 
    getUserInformation, 
    updateUserInformation, 
    updateUserPassword, 
    deleteUserAccount,
    deleteUserAvatar 
}