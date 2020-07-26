/*
    * TODO: Work on the css from the site
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