const router = require('express').Router()

const { catchErrors } = require('../Handlers/errorHandler')
const { loginUser } = require('../Controllers/userController')
const { sendResetPassEmail, resetUserPassword } = require('../Controllers/forgotPasswordController')
const checkResetPassToken = require('../Middlewares/checkResetPassToken')


router.post('/:remember', catchErrors(loginUser))

router.put('/forgot-password', catchErrors(sendResetPassEmail))

router.put(
    '/reset-password/:token', 
    catchErrors(checkResetPassToken), 
    catchErrors(resetUserPassword)
)

module.exports = router