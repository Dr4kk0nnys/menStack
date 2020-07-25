import bcryptjs from 'bcryptjs'
import passport from 'passport'

import localPassport from 'passport-local'
const LocalStrategy = localPassport.Strategy

import Database from './database.js'
const database = new Database()


function initialize() {
    async function authenticateUser(email, password, done) {

        const user = await database.getUserByEmail(email)

        if (user == null) return done(null, false, { message: 'No user with that email' })

        try {
            if (await bcryptjs.compare(password, user.password)) return done(null, user)
            else return done(null, false, { message: 'Incorrect password' })
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, String(user._id)))
    passport.deserializeUser(async (id, done) => done(null, await database.getUserById(id)))
}


export default initialize