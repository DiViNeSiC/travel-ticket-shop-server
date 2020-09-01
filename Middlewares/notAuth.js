const User = require('../Models/user')

module.exports = async (req, res, next) => {
    try {
        const authToken = req.headers.authorization
        if (authToken) {
            const token = authToken.split(' ')[1]
            const user = await User.findOne({ token })
            if (user != null) 
                return res.status(405).json({ 
                    message: 'Not Allowed!', isAuth: true
                })
        }
        
        next()
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}