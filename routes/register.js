import bcryptjs from 'bcryptjs'
import { } from 'dotenv/config.js'

import express from 'express'
const router = express.Router()

import Database from '../utils/database.js'
const database = new Database(process.env.DATABASE_NAME, process.env.USERS_TABLE_NAME)

router.get('/', (req, res) => {
    res.render('register.ejs')
})

router.post('/', async (req, res) => {
    try {
        /*
            * It first check if the user.email is already inside the database
            *   ( if the email has already been registered )
            * If it does, it show an error scree
            * If it doesn't it saves the email to the database
            *   it also saves the password, but encrypted
            *   and then redirects the user to the /login page
        */
        const users = await database.readAll()
        const isEmailRegistered = users.filter(user => user.email === req.body.email)

        if (isEmailRegistered[0]) {
            return res.render('error.ejs', { error: 'This email has already been registered!' })
        }

        const hashedPassword = await bcryptjs.hash(req.body.password, 10)
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        }

        await database.add(newUser)

        res.redirect('/login')
    } catch (error) {
        res.render('error.ejs', { error })
    }
})

export default router