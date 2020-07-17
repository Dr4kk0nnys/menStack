import bcrypt from 'bcrypt'
import { } from 'dotenv/config.js'

import express from 'express'
const router = express.Router()

import Database from '../utils/database.js'
const database = new Database(process.env.DATABASE_NAME, process.env.USERS_TABLE_NAME)

router.get('/', (req, res) => {
    res.render('login.ejs')
})

router.post('/', async (req, res) => {
    try {
        const users = await database.readAll()
        users.map(user => {
            if (user.email === req.body.email) {

                const result = bcrypt.compareSync(req.body.password, user.password)
                if (result) {
                    res.redirect('/login')
                } else {
                    res.render('incorrect-credentials.ejs')
                }


            } else if (user.email === users[users.length - 1].email) {
                res.render('incorrect-credentials.ejs')
            }
        })
    } catch (error) {
        res.render('error.ejs', { error })
    }
})

export default router