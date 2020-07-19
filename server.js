import { } from 'dotenv/config.js'

import path from 'path'
const __dirname = path.resolve(path.dirname(''))

// Routes
import register from './routes/register.js'
import login from './routes/login.js'
import todos from './routes/todos.js'

// Passport
import session from 'express-session'
import passport from './routes/authentication.js'

import express from 'express'
const app = express()

app.set('view-engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.use(session({
    secret: 'verySecret',
    resave: false,
    saveUninitialized: true
}))

app.use(express.urlencoded({ extended: false }))

// Passport
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/register', register)
app.use('/login', login)
app.use('/todos', todos)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))