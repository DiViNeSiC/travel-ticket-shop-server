const jwt = require('jsonwebtoken')
const User = require('../Models/user')
const bcrypt = require('bcrypt')

const emailSenderHandler = require('../Handlers/emailSenderHandler')
const { RESET_PASSWORD_METHOD } = require('../Handlers/MethodHandlers/sendEmailMethodHandler')

const sendResetPassEmail = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (user == null) throw "User With This Email Doesn't Exist"

    const resetPassToken = await jwt.sign(
        { id: user.id }, 
        process.env.JWT_RESET_PASSWORD_SECRET,
        { expiresIn: '15m' }
    )

    await user.updateOne({ resetPassToken })

    try {
        await emailSenderHandler(email, resetPassToken, RESET_PASSWORD_METHOD)
        res.json({ 
            message: 'Reset password email has been sent to your email account, Please check your email',
        })
    } catch (err) {
        res.status(400).json({ 
            message: 'We Cannot Send You Email!', 
            error: err.message 
        })
    }
}

const resetUserPassword = async (req, res) => {
    const { newPassword } = req.body
    const hashedPassword = await bcrypt
        .hash(newPassword.toString(), 10)
    const user = await User
        .findByIdAndUpdate(req.decodedToken.id, { 
            password: hashedPassword, 
            resetPassToken: '' 
        })

    res.json({ message: `User ${user.username} Successfully Reset Password` })
}

module.exports = { sendResetPassEmail, resetUserPassword }