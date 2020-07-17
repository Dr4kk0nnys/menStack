import { } from 'dotenv/config.js'

import express from 'express'
const router = express.Router()

import Database from '../utils/database.js'
const database = new Database(process.env.DATABASE_NAME, process.env.USERS_TABLE_NAME)

router.get('/', (req, res) => {
    res.render('register.ejs')
})

router.post('/', (req, res) => {
    /*
        * TODO: Add it to the database
        * TODO: Encrypt the password
    */
})

export default router