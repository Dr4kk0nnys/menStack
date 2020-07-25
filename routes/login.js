import auth from '../utils/auth.js'

import passport from 'passport'

import express from 'express'
const router = express.Router()


router.get('/', auth.checkNotAuthenticated, (req, res) => {
    /*
        * checkNotAuthenticated checks inside the session for an user _id
        * If found, redirects the user to /todos ( since the user is already logged in )
        * If not, it just let the user go to the /login page
    */
    res.render('login.ejs')
})

router.post('/', passport.authenticate('local', {
    /*
        * Post method for the authenticate method
        * If the credentials are correct, the user proceed to go to /todos
        * If not, it goes to /incorrect-credentials
        
        * This authenticate function serializes the user._id automatically
        * For so, it creates the session for the user, allowing it to stay connected
    */
    successRedirect: '/todos',
    failureRedirect: '/incorrect-credentials'
}))


export default router