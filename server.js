import { } from 'dotenv/config.js'

import path from 'path'
const __dirname = path.resolve(path.dirname(''))

import Database from './utils/database.js'
const database = new Database()
async function connectDatabase() {
    console.log('Initializing database!')
    await database.connect()
}
connectDatabase()

// Passport config
import methodOverride from 'method-override'
import session from 'express-session'
import passport from 'passport'

import initialize from './utils/passport-config.js'
initialize(
    passport,
    async email => {
        const users = await database.getUsers().toArray()
        return users.find(user => user.email === email)
    },
    async id => {
        const users = await database.getUsers().toArray()
        return users.find(user => String(user._id) === id)
    }
)

// Routes
import index from './routes/index.js'
import register from './routes/register.js'
import login from './routes/login.js'
import todos from './routes/todos.js'
import incorrectCredentials from './routes/incorrect-credentials.js'

import express from 'express'
const app = express()


app.set('view-engine', 'ejs')
app.use(express.static(__dirname + '/public'))

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

app.delete('/logout', (req, res) => {
    /*
        * Delete is the correct way of deleting sessions
        * The req.logOut function is set by passport automatically
        * It clears the session, and log the user out
        * And after that, it redirects the user out to the /login page
    */
    req.logOut()
    res.redirect('/login')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))