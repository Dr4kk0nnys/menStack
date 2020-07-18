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
    // TODO: Figure it out a way to check if an email isn't registered
    // TODO: Work on the checking of incorrect credentials in general,
    //          such as incorrect password and email
    try {
        const users = await database.readAll()
        users.map(user => {
            if (user.email === req.body.email) {
                bcrypt.compare(req.body.password, user.password, (err, logged) => {
                    if (logged) res.redirect('/todos')
                    else res.render('incorrect-credentials.ejs')
                })
            }
        })
    } catch (error) {
        res.render('error.ejs', { error })
    }
})

export default router