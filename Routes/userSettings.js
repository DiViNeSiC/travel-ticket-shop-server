const router = require('express').Router()
const checkPassword = require('../Middlewares/checkPassword')
const { 
    getUserInformation, 
    updateUserInformation,
    updateUserPassword,
    deleteUserAccount 
} = require('../Controllers/userSettingsController')
const { catchErrors } = require('../Handlers/errorHandler')

router.get('/settings', catchErrors(getUserInformation))

router.put('/settings/update', catchErrors(updateUserInformation))
router.put('/settings/change-password', checkPassword, catchErrors(updateUserPassword))

router.delete('/settings/delete-account', checkPassword, catchErrors(deleteUserAccount))

module.exports = router