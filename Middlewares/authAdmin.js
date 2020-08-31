const { ADMIN_ROLE } = require("../Handlers/MethodHandlers/userRoleHandler")

module.exports = (req, res, next) => {
    const role = req.payload.role

    if (role !== ADMIN_ROLE) 
        return res.status(403).json({ 
            message: 'You do not have access to edit products' 
        })

    next()
}