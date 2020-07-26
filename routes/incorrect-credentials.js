import auth from '../utils/auth.js'

import express from 'express'
const router = express.Router()

router.get('/', auth.checkNotAuthenticated, (req, res) => {
    res.render('incorrect-credentials.ejs')
})

export default router