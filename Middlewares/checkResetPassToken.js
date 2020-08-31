const User = require('../Models/user')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        const { token } = req.params
        if (token == null) 
            return res.status(401).json({ message: 'No Token Found!' }) 
            
        const user = await User.findOne({ resetPassToken: token })
        if (user == null) 
            return res.status(401).json({ message: 'Invalid Token!' })

        const decodedToken = await jwt.verify(token, process.env.JWT_RESET_PASSWORD_SECRET)
        if (decodedToken == null) 
            return res.status(401).json({ message: 'Your Token Has Expired!' }) 

        req.decodedToken = decodedToken
        next()
    } catch (err) {
        res.status(500).json({ message: 'Something Went Wrong!', error: err.message })
    }
}