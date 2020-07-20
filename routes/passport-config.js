import bcryptjs from 'bcryptjs'

import localPassport from 'passport-local'
const LocalStrategy = localPassport.Strategy


function initialize(passport, getUserByEmail, getUserById) {
    console.log('Initialize called!')
    async function authenticateUser(email, password, done) {
        const user = await getUserByEmail(email)

        if (user == null) {
            console.log('Unregistered email')
            return done(null, false, { message: 'No user with that email' })
        }

        try {
            if (await bcryptjs.compare(password, user.password)) {
                console.log('Logged in')
                return done(null, user)
            }
            else {
                console.log('Incorrect password')
                return done(null, false, { message: 'Incorrect password' })
            }

        } catch (e) {
            console.log('Error')
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => { done(null, user.id) })
    passport.deserializeUser(async (id, done) => { done(null, await getUserById(id)) })
}

export default initialize