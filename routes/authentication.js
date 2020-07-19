import bcryptjs from 'bcryptjs'
import { } from 'dotenv/config.js'
import passport from 'passport'

import passportLocal from 'passport-local'
const LocalStrategy = passportLocal.Strategy

import Database from '../utils/database.js'
const database = new Database(process.env.DATABASE_NAME, process.env.USERS_TABLE_NAME)

passport.use(new LocalStrategy({ usernameField: 'email' },
    async function (email, password, done) {
        try {
            const users = await database.readAll()
            const user = users.filter(user => user.email === email)[0]

            if (user) {
                const isLogged = await new Promise((resolve, reject) => {
                    if (bcryptjs.compareSync(password, user.password)) {
                        resolve(true)
                    }

                    resolve(false)
                })

                if (isLogged) return done(null, user)
                return done(null, false, { message: 'Incorrect password!' })
            } else {
                return done(null, false, { message: 'No email registered!' })
            }

        } catch (error) {
            return done(error)
        }
    }
))