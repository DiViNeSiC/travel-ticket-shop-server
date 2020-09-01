const path = require('path')
const fs = require('fs')
const uploadBasePath = require('./avatarImageBasePath')

const deleteOneFile = (filename) => {
    let taskMessage
    let error = false

    const filePath = path.join(uploadBasePath, filename)

    fs.unlink(filePath, (err) => {
        if (err) {
            error = true 
            taskMessage = `Cannot Remove The File ${err.message}`
            return { taskMessage, error }
        }
    })

    taskMessage = `Trash Avatar Deleted Successfully`
    
    return { taskMessage, error }
}

module.exports = deleteOneFile