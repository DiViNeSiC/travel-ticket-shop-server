const bcrypt = require('bcrypt')
const User = require('../Models/user')

module.exports = async (req, res, next) => {
    try {
        const { password } = req.body
        const user = await User.findById(req.payload.id)
        if (user == null) throw 'You Are Not Logged In But How?!'
        
        const correctPassword = await bcrypt
            .compare(password.toString(), user.password)
    
        if (!correctPassword) 
            return res.status(401).json({ message: 'Incorrect Password' })
        
        next()
    } catch (err) {
        res.status(500).json({ 
            message: 'Something Went Wrong',
            error: err.message 
        })
    }
}