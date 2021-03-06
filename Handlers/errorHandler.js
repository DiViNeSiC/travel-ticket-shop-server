const deleteTrashAvatar = require('../Handlers/FileHandlers/AvatarImages/deleteTrashAvatar')

/*Catch Errors Handler*/
exports.catchErrors = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => {
            const avatarName = req.file != null ? req.file.filename : null
            if (typeof err === "string") {
                if(avatarName) deleteTrashAvatar(avatarName)

                res.status(400).json({
                    message: err,
                })
            } else {
                if(avatarName) deleteTrashAvatar(avatarName)

                next(err)
            }
        })
    }
}

/*MongoDB Validation Error Handler*/
exports.mongoseErrors = (err, req, res, next) => {
    if (!err.errors) return next(err)
    const errorKeys = Object.keys(err.errors)
    let message = ""
    errorKeys.forEach((key) => (message += err.errors[key].message + ", "))

    message = message.substr(0, message.length - 2);

    res.status(400).json({
        message,
    })
}

/*Development Error Handler*/
exports.developmentErrors = (err, req, res, next) => {
    err.stack = err.stack || ""
    const errorDetails = {
        message: err.message,
        status: err.status,
        stack: err.stack,
    }
    res.status(err.status || 500).json(errorDetails)
}

/*Production Error Handler*/
exports.productionErrors = (err, req, res, next) => {
    res.status(err.status || 500).json({
        error: "Internal Server Error",
    })
}

/*404 Page Error*/
exports.notFound = (req, res, next) => {
    res.status(404).json({
        message: "Page not found",
    })
}