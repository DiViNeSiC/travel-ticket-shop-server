const User = require('../Models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const deleteTrashAvatar = require('../Handlers/FileHandlers/AvatarImages/deleteTrashAvatar')
const emailSenderHandler = require('../Handlers/emailSenderHandler')
const { ADMIN_ROLE, USER_ROLE } = require('../Handlers/MethodHandlers/userRoleHandler')
const { ACTIVATION_METHOD } = require('../Handlers/MethodHandlers/sendEmailMethodHandler')

const registerUser = async (req, res) => {
    const avatarName = req.file != null ? req.file.filename : ''
    const { name, lastname, username, email, password } = req.body
    const isAdmin = req.params.isAdmin

    if (!username) throw 'Username Is Required' 

    if (!password) throw 'Password Is Required' 

    if (!email) throw 'Email Is Required' 

    if (username.length < 6) 
        throw 'Username Must Be At Least 6 Characters' 

    if (password.length < 8) 
        throw 'Password Must Be At Least 8 Characters' 

    const allUsers = await User.find()
    const usernameExist = allUsers.some(user => 
            user.username === username.toLowerCase()
        )
    const emailExist = allUsers.some(user => 
            user.email === email.toLowerCase()
        )
        
    if(usernameExist) throw 'Username Already Exist!'
    
    if(emailExist) throw 'Email Already Exist!'
    
    const role = isAdmin === ADMIN_ROLE ? ADMIN_ROLE : USER_ROLE
    const activationToken = await jwt.sign({ 
        name, 
        lastname, 
        username, 
        email,
        role,
        avatarName,
        password 
    }, process.env.JWT_SECRET, { expiresIn: '20m' })

    try {
        await emailSenderHandler(email, activationToken, ACTIVATION_METHOD)
        res.json({ 
            message: 'Activation email has been sent to your email account, Please active your account',
        })
    } catch (err) {
        deleteTrashAvatar(avatarName)
        res.status(400).json({ 
            message: 'We Cannot Send You An Activation Email!', 
            error: err.message 
        })
    }
}

const activeUserAccount = async (req, res) => {
    const token = req.params.token
    if (token == null) throw 'Token is Empty!'
    let decodedToken
    
    try {
        decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        res.status(403).json({ 
            message: "Token Is Not A JWT Token Or It's Expired!" 
        })
    }

    const { 
        name, lastname, email, username,
        role, avatarName, password 
    } = decodedToken

    const hashedPassword = await bcrypt.hash(password.toString(), 10)
    const newUser = new User({ 
        name, 
        lastname, 
        username, 
        email, 
        role,
        avatarName,
        password: hashedPassword
    })

    await newUser.save()

    res.json({ message: `User ${username} Successfully Created!` })
}

const loginUser = async (req, res) => {
    const { usernameOrEmail, password } = req.body
    const remember = req.params.remember

    if (!usernameOrEmail) 
        throw 'Username Or Email Is Required' 

    if (!password) 
        throw 'Password Is Required' 
    
    const allUsers = await User.find()
    const user = allUsers.find(user => 
            user.email === usernameOrEmail.toLowerCase() || 
            user.username === usernameOrEmail.toLowerCase()
        )

    if(user == null) throw 'No User Found By That Information!'

    const correctPassword = await bcrypt.compare(password.toString(), user.password)
    if(!correctPassword) throw 'Incorrect Password'
    
    const expireDay = remember ? '7day' : '5h'

    const token = await jwt.sign({ 
        id: user._id, 
        name: user.name, 
        lastname: user.lastname, 
        username: user.username,
        email: user.email,
        avatarName: user.avatarName,
        role: user.role 
    }, process.env.JWT_SECRET, { expiresIn: expireDay })

    await User.findByIdAndUpdate(user._id, { token })

    res.json({ user, token })
}

const logoutUser = async (req, res) => {
    const user = await User.findById(req.payload.id)
    
    if (user == null) throw 'No User Found!'

    await user.updateOne({ token: '' })

    res.json({ message: `Log Out: ${user.username}` })
}

module.exports = { 
    registerUser, 
    activeUserAccount, 
    loginUser, 
    logoutUser 
}