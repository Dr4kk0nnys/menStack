import { } from 'dotenv/config.js'
import bcryptjs from 'bcryptjs'

import auth from '../utils/auth.js'

import express from 'express'
const router = express.Router()

import Database from '../utils/database.js'
const database = new Database()

router.get('/', auth.checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})
router.post('/', auth.checkNotAuthenticated, async (req, res) => {
    try {
        /*
            * It first check if the user.email is already inside the database
            *   ( if the email has already been registered )
            * If it does, it shows an error screen
            * If it doesn't it saves the email to the database
            *   it also saves the password, but encrypted
            *   and then redirects the user to the /login page
        */
        const users = await database.getUsers().toArray()

        if (!users.every(user => user.email !== req.body.email))
            return res.render('error.ejs', { error: 'This email has already been registered!' })

        const { name, email, password } = req.body

        /* Name */
        if (name.length < 3) return res.render('weak-credentials.ejs')

        /* Email */
        if (email.length < 7) return res.render('weak-credentials.ejs')

        /* Password */
        if (password.length < 6) return res.render('weak-credentials.ejs')

        // Every element of the array is the same ( aaaaaa, 111111 )
        if ([...password].every(element => element === [...password][0])) return res.render('weak-credentials.ejs')

        const hashedPassword = await bcryptjs.hash(password, 10)
        const newUser = { name, email, 'password': hashedPassword }

        await database.insert(newUser)
        res.redirect('/login')

    } catch (error) {
        res.render('error.ejs', { error })
    }
})

export default router