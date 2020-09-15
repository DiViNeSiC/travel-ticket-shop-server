const User = require('../../Models/user')

module.exports = async (req, res, next) => {
    const user = await User.findById(req.payload.id)
    if (user == null) throw 'User Not Found'

    const newCart = []

    await user.updateOne({ inCart: newCart })

    req.newCart = newCart
    req.message = `Cart Cleared`
    
    next()
} 