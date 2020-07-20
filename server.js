import { } from 'dotenv/config.js'

import path from 'path'
const __dirname = path.resolve(path.dirname(''))

// Passport config
import methodOverride from 'method-override'
import session from 'express-session'
import passport from 'passport'

import Database from './utils/database.js'
const database = new Database(process.env.DATABASE_NAME, process.env.USERS_TABLE_NAME)
import initialize from './routes/passport-config.js'
initialize(
    passport,
    async email => {
        const users = await database.readAll()
        return users.find(user => user.email === email)
    },
    async id => {
        const users = await database.readAll()
        return users.find(user => user.id === id)
    }
)

// Routes
import register from './routes/register.js'
import login from './routes/login.js'
import todos from './routes/todos.js'

import express from 'express'
const app = express()

app.set('view-engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.use(express.urlencoded({ extended: false }))

// Passport
app.use(session({
    secret: 'verySecret',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// Routes
app.use('/register', (register, checkNotAuthenticated))
// app.use('/login', login)
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})
app.get('/todos', checkAuthenticated, (req, res) => {
    res.render('todos.ejs', { name: req.user.name })
})
app.post('/login', passport.authenticate('local', { successRedirect: '/todos', failureRedirect: '/error' }))
// Middleware function
function checkAuthenticated(req, res, next) {
    // return true if the user is authenticated
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/todos')
    }
    next()
}
// In order to use delete as a 'form'
// it needs an external method called 'method-override' (npm i method-override)
app.delete('/logout', (req, res) => {
    // function that passport sets
    // it clear the session and log the user out
    req.logOut()
    res.redirect('/login')
})

// app.use('/todos', todos)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))