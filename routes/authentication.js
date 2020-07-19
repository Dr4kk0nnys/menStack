import bcryptjs from 'bcryptjs'
import { } from 'dotenv/config.js'
import passport from 'passport'

import passportLocal from 'passport-local'
const LocalStrategy = passportLocal.Strategy

import Database from '../utils/database.js'
const database = new Database(process.env.DATABASE_NAME, process.env.USERS_TABLE_NAME)

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
    function (email, password, done) {
        User.findOne({ email }, (err, user) => {
            if (err) {
                console.log('Authentication error: ' + err)
                return done(err)
            }
            if (!user) {
                console.log('No user')
                return done(null, false, { message: 'Incorrect email' })
            }

            if (!user.validPassword(password)) {
                console.log('No password')
                return done(null, false, { message: 'Incorrect password' })
            }

            return done(null, user)
        })
    }
))

export default passport