const router = require('express').Router()
const rolePass = require('../Middlewares/rolePass')
const { catchErrors } = require('../Handlers/errorHandler')
const { registerUser, activeUserAccount } = require('../Controllers/userController')

router.post('/:isAdmin', rolePass, catchErrors(registerUser))
router.post('/activation/:token', catchErrors(activeUserAccount))


module.exports = router