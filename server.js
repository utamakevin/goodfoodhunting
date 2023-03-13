const express = require('express') // require is a label that returns a function
const app = express()
const port = process.env.PORT || 3000
const session = require('express-session')
const MemoryStore = require('memorystore')(session)
const setCurrentUser = require('./middlewares/set_current_user')
const logger = require('./middlewares/logger')
const methodOverride = require('./middlewares/method-override')
const pool = require('./db')
const viewHelpers = require('./middlewares/view_helpers')

// controllers
const sessionController = require('./controllers/session_controller')
const dishController = require('./controllers/dish_controller')

// view engine
app.set('view engine', 'ejs')
    
// middlewares
// middleware function has a signature
app.use(logger)
app.use(express.static('public')) // mini router inside
app.use(express.urlencoded({extended: true})) // middleware to parse the request body so we can read and use req.body. It parses the raw request body and turn it into an object accessible at req.body
app.use(methodOverride) // to allow delete method
// app.use(expressLayouts) // for using layout
app.use(session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
}))

// I want currentUser to be availabale in all my views
app.use(setCurrentUser)
app.use(viewHelpers)

app.use('/', sessionController)
app.use('/', dishController)




app.listen(port, () => {
    console.log(`listening on port ${port}`)
})