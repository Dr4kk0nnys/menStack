import bcryptjs from 'bcryptjs'
import { } from 'dotenv/config.js'

import express from 'express'
const router = express.Router()

import Database from '../utils/database.js'
const database = new Database(process.env.DATABASE_NAME, process.env.USERS_TABLE_NAME)

router.get('/', (req, res) => {
    res.render('login.ejs')
})

router.post('/', async (req, res) => {
    /*
        * TODO: If the user is logged in, it shouldn't be able to go to the /login route
        * TODO: If it's logged in, it shouldn't be able to go to the /register route
        * TODO: Figure it out a way to check if the user is logged in
        *   you could try to create a req.user.{name}.logged = True
        *   but i have no idea how to create it
        TODO: Create a checkLoggedIn() function
    */
    try {
        const users = await database.readAll()
        const user = users.filter(user => req.body.email === user.email)[0]

        if (user) {
            /*
                * IsLogged is a promise that returns true if the user
                * has an email and password registered in the database
                * false if it doesn't
            */
            const isLogged = await new Promise((resolve, reject) => {
                if (bcryptjs.compareSync(req.body.password, user.password)) {
                    resolve(true)
                }

                resolve(false)
            })

            if (isLogged) res.redirect('/todos')
            res.render('error.ejs', { error: 'Incorrect password' })
        } else {
            res.render('error.ejs', { error: 'Incorrect email!' })
        }
    } catch (error) {
        res.render('error.ejs', { error })
    }
})

export default router