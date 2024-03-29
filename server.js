if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

//routers
const paymentRouter = require('./routes/payments')
const accountRouter = require('./routes/account')
const userRouter = require('./routes/users')
const indexRouter = require('./routes/index')



users = []

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

app.use(flash())
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false
}))
app.use(passport.initialize())
app.use(passport.session())

//DB
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
}) 
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connnected to Mongoose'))

app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/accounts', accountRouter)
app.use('/payments', paymentRouter)

app.listen(process.env.PORT || 3001)
 