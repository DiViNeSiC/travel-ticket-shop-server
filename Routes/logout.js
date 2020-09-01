const router = require('express').Router()
const { catchErrors } = require('../Handlers/errorHandler')
const { logoutUser } = require('../Controllers/userController')

router.delete('/', catchErrors(logoutUser))

module.exports = router