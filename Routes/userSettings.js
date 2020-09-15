const router = require('express').Router()
const upload = require('../Middlewares/Uploads/avatarImageUpload')
const checkPassword = require('../Middlewares/checkPassword')
const { catchErrors } = require('../Handlers/errorHandler')
const { 
    getUserInformation, 
    updateUserInformation,
    updateUserPassword,
    updateUserAvatar,
    deleteUserAccount,
    deleteUserAvatar 
} = require('../Controllers/userSettingsController')

router.get('/settings', catchErrors(getUserInformation))

router.put(
    '/settings/update', 
    catchErrors(updateUserInformation)
)

router.put(
    '/settings/update/avatar', 
    upload.single('avatar'), 
    catchErrors(updateUserAvatar)
)

router.put(
    '/settings/change-password', 
    checkPassword, 
    catchErrors(updateUserPassword)
)

router.delete(
    '/settings/delete-account', 
    checkPassword, 
    catchErrors(deleteUserAccount)
)

router.delete(
    '/settings/avatar/delete', 
    catchErrors(deleteUserAvatar)
)

module.exports = router