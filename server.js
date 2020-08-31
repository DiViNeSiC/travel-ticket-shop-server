//Config Dotenv Library If We On Development
if (process.env.NODE !== 'production') {
    require('dotenv').config()
}

//Importing Modules And Libraries
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

//Importing Routes
const indexRouter = require('./Routes/index')
const dashboardRouter = require('./Routes/dashboard')
const registerRouter = require('./Routes/register')
const loginRouter = require('./Routes/login')
const viewProductRouter = require('./Routes/viewProduct')
const controlProductRouter = require('./Routes/controlProduct')
const userSettingsRouter = require('./Routes/userSettings')

//Authorization Middlewares
const auth = require('./Middlewares/auth')
const authAdmin = require('./Middlewares/authAdmin')

//MongoDB Connection
mongoose.connect(process.env.DATABASE_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const db = mongoose.connection

db.on('error', (err) => console.error(`Error To Connect: ${err}`))
db.once('open', () => console.log('Connected To Mongoose'))

//Use Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('./public'))

//Use Routes 
app.use('/', indexRouter)
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/product', viewProductRouter)
app.use('/dashboard', auth, dashboardRouter, userSettingsRouter)
app.use('/control/product', auth, authAdmin, controlProductRouter)

//Server Listen
const port = process.env.PORT || 3001

app.listen(port, () => console.log(`Server Running On ${port}`))