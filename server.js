const express = require('express') // require is a label that returns a function
const app = express()
// const methodOverride = require('method-override')
const port = process.env.PORT || 3000
const session = require('express-session')


// http methods - get post put patch delete
// tim - 
/* CRUD app
*           DATABASE    HTTP
* create    insert      post
* read      select      get
* update    update      put/patch
* destroy   delete      delete
*
* using different names is like using div for everything in html
*
* HTTP is stateless - can't remember info in memory
*
* MVC - model view controllers - separation of concerns\
*
* resources you're working with
*
*
*
*/

const sessionController = require('./controllers/session_controller')

app.set('view engine', 'ejs')
    
const setCurrentUser = require('./middlewares/set_current_user')
const logger = require('./middlewares/logger')
const methodOverride = require('./middlewares/method-override')
const pool = require('./db')
const viewHelpers = require('./middlewares/view_helpers')


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
}))

// I want currentUser to be availabale in all my views
app.use(setCurrentUser)
app.use(viewHelpers)

app.use('/', sessionController)
app.use('/', require('./controllers/dish_controller'))




app.listen(port, () => {
    console.log(`listening on port ${port}`)
})