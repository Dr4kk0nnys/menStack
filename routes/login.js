import auth from '../utils/auth.js'

import passport from 'passport'

import express from 'express'
const router = express.Router()


router.get('/', auth.checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

router.post('/', passport.authenticate('local', {
    successRedirect: '/todos',
    failureRedirect: '/error'
}))

export default router