const jwt = require('jsonwebtoken')
const User = require('../Models/user')

module.exports = async (req, res, next) => {
    let user
    try {
        const authHeader = req.headers.authorization 
        if (authHeader == null) 
            return res.status(401).json({ 
                message: 'You Need To Sign In!', isAuth: false 
            })
            
        const token = authHeader.split(' ')[1]
        user = await User.findOne({ token })
        if (user == null) 
            return res.status(401).json({ 
                message: 'You Need To Sign In!', isAuth: false
            })
        
        const payload = await jwt.verify(token, process.env.JWT_SECRET)
        if (payload == null) { 
            await user.updateOne({ token: '' })
            return res.status(401).json({ 
                message: 'Your Has Been Expired', isAuth: false
            })
        }

        req.payload = payload
        next()
    } catch (err) {
        if (err.message === 'jwt expired') {
            await user.updateOne({ token: '' })
            return res.status(401).json({ 
                message: 'Your Has Been Expired', isAuth: false
            })
        }
        res.status(500).json({ message: err.message })
    }
}