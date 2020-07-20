import auth from '../utils/auth.js'

import express from 'express'
const router = express.Router()


router.get('/', auth.checkAuthenticated, (req, res) => {
    res.render('todos.ejs', { name: req.user.name })
})

export default router