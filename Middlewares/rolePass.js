const bcrypt = require('bcrypt')
const { ADMIN_ROLE } = require('../Handlers/MethodHandlers/userRoleHandler')

module.exports = async (req, res, next) => {
    const isAdmin = req.params.isAdmin
    if(isAdmin !== ADMIN_ROLE) return next()

    const { adminPassword } = req.body
    if(adminPassword == null) 
        return res.status(403).json({ message: 'No Admin Password Found' }) 

    const isCorrect = await bcrypt.compare(adminPassword.toString(), process.env.ADMIN_PASSWORD)
    if(!isCorrect) 
        return res.status(403).json({ message: 'Incorrect Admin Password' }) 
    next()
}