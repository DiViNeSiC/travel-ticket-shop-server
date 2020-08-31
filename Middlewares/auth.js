const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        if (!token) return res.status(401).json({ message: 'You Need To Sign In!' })

        const payload = await jwt.verify(token.split(' ')[1], process.env.JWT_SECRET)
        req.payload = payload
        next()
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}