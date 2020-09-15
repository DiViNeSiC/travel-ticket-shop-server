const path = require('path')
const fs = require('fs')
const uploadBasePath = require('./productImageBasePath')

const deleteAllFiles = (filenames) => {
    let taskMessage
    let error = false

    if (!filenames.length || !filenames) {
        error = true
        taskMessage = 'Files Are Empty !'
        return { taskMessage, error }
    }

    filenames.forEach(async (filename) => {
        const filePath = path.join(uploadBasePath, filename)
        fs.unlink(filePath, err => {
            if (err) {
                error = true 
                taskMessage = `Cannot Remove The File ${err.message}`
                return { taskMessage, error }
            }  
        })            
    })
    
    taskMessage = 'Images Deleted Successfully'

    return { taskMessage, error }
}


module.exports = deleteAllFiles