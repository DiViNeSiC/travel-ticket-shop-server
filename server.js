//Config Dotenv Library If We On Development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

//Importing Modules And Libraries
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//Calling Express Function
const app = express()

//Importing Routes
const indexRouter = require('./Routes/index')
const dashboardRouter = require('./Routes/dashboard')
const registerRouter = require('./Routes/register')
const loginRouter = require('./Routes/login')
const viewProductRouter = require('./Routes/viewProduct')
const controlProductRouter = require('./Routes/controlProduct')
const addToCartRouter = require('./Routes/addToCart')
const userSettingsRouter = require('./Routes/userSettings')
const logoutRouter = require('./Routes/logout')

//Authorization Middlewares
const auth = require('./Middlewares/auth')
const notAuth = require('./Middlewares/notAuth')
const authAdmin = require('./Middlewares/authAdmin')

//MongoDB Connection
mongoose.connect(process.env.DATABASE_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const db = mongoose.connection

db.on('error', (err) => 
    console.error(`Error To Connect: ${err}`)
)

db.once('open', () => 
    console.log('Connected To Mongoose')
)

//Use Middlewares
app.use(cors({origin: '*'}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('./public'))

//Use Routes 
app.use('/', indexRouter)
app.use('/register', notAuth, registerRouter)
app.use('/login', notAuth, loginRouter)
app.use('/logout', auth, logoutRouter)
app.use('/product', viewProductRouter)
app.use('/dashboard', auth, dashboardRouter, userSettingsRouter)
app.use('/cart', auth, addToCartRouter)
app.use('/control/product', auth, authAdmin, controlProductRouter)

//Server Listen
const port = process.env.PORT || 3001

app.listen(port, () => console.log(`Server Running On ${port}`))