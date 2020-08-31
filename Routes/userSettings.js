const router = require('express').Router()
const checkPassword = require('../Middlewares/checkPassword')
const upload = require('../Middlewares/Uploads/avatarImageUpload')
const { catchErrors } = require('../Handlers/errorHandler')
const { 
    getUserInformation, 
    updateUserInformation,
    updateUserPassword,
    deleteUserAccount,
    deleteUserAvatar 
} = require('../Controllers/userSettingsController')

router.get('/settings', catchErrors(getUserInformation))

router.put('/settings/update', upload.single('avatar'), catchErrors(updateUserInformation))
router.put('/settings/change-password', checkPassword, catchErrors(updateUserPassword))

router.delete('/settings/delete-account', checkPassword, catchErrors(deleteUserAccount))
router.delete('/settings/avatar/delete', catchErrors(deleteUserAvatar))

module.exports = router