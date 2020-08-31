const path = require('path')
const fs = require('fs')
const uploadBasePath = require('./avatarImageBasePath')
const User = require('../../../Models/user')

const deleteOneFile = async (filename, userId) => {
    let taskMessage
    let error = false

    const user = await User.findById(userId)
    if (user == null) { 
        error = true
        taskMessage = 'No User Found'
        return { taskMessage, error }
    }

    const { avatarName } = user
    if (avatarName !== filename) {
        error = true
        taskMessage = 'No Avatar Found'
        return { taskMessage, error }
    }

    const filePath = path.join(uploadBasePath, filename)

    fs.unlink(filePath, async (err) => {
        if (err) {
            error = true 
            taskMessage = `Cannot Remove The File ${err.message}`
            return { taskMessage, error }
        }
        await user.updateOne({ 
            avatarName: '' 
        })  
    })

    taskMessage = `User Avatar Deleted Successfully`
    
    return { taskMessage, error }
}

module.exports = deleteOneFile