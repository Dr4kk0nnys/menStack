/*
    * TODO: Work on the css from the site
    * TODO: Check for every entry of the user data
        * every time a database is called
        * every time data is retrieved by the user
        * do not trust any data that comes or goes to the user
        * check everything


    -> In progress ... <-
    * TODO: Try to avoid calling the database three times
        * you could theoretically call the database once on the server.js file
        * and import the database const from other files
        * 
        * const database = new Database // server.js
        * import database from '../server.js' // auth.js
*/

// Passport config
import methodOverride from 'method-override'
import session from 'express-session'
import passport from 'passport'
import initialize from './utils/passport-config.js'
initialize()

// Routes
import index from './routes/index.js'
import register from './routes/register.js'
import login from './routes/login.js'
import todos from './routes/todos.js'
import incorrectCredentials from './routes/incorrect-credentials.js'
import logout from './routes/logout.js'

import express from 'express'
const app = express()


app.set('view-engine', 'ejs')
app.use(express.static('public'))

app.use(express.urlencoded({ extended: false }))

// Passport
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// Routes
app.use('/', index)
app.use('/register', register)
app.use('/login', login)
app.use('/todos', todos)
app.use('/incorrect-credentials', incorrectCredentials)
app.delete('/logout', logout)

app.listen(3000, () => console.log(`Server listening on port 3000`))