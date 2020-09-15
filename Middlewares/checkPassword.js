const bcrypt = require('bcrypt')
const User = require('../Models/user')

module.exports = async (req, res, next) => {
    try {
        const currentPass = req.body.currentPass || req.query.currentPass

        const user = await User.findById(req.payload.id)
        if (user == null) throw 'You Are Not Logged In But How?!'
        
        const correctPassword = await bcrypt
            .compare(currentPass.toString(), user.password)
    
        if (!correctPassword) 
            return res.status(403).json({ message: 'Incorrect Password' })
        
        next()
    } catch (err) {
        res.status(500).json({ 
            message: 'Something Went Wrong',
            error: err.message 
        })
    }
}