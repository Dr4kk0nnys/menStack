import auth from '../utils/auth.js'

import express from 'express'
const router = express.Router()

import Database from '../utils/database.js'
const database = new Database()


router.get('/', auth.checkAuthenticated, async (req, res) => {
    try {

        const name = req.user.name
        const user_id = String(req.user._id)
        const todos = await database.getTodosByUserID(user_id).toArray()

        res.render('todos.ejs', { name, user_id, todos })
    } catch (error) {
        throw error
    }
})

router.get('/add_todo', auth.checkAuthenticated, (req, res) => {
    res.render('add-todo.ejs')
})

router.post('/add_todo', auth.checkAuthenticated, async (req, res) => {
    try {
        const user_id = String(req.user._id)
        const { title, description } = req.body

        if (user_id && title && description) await database.insert({ user_id, title, description })
        res.redirect('/todos')
    } catch (error) {
        res.render('error.ejs', { error })
    }
})

router.get('/remove_todo', auth.checkAuthenticated, (req, res) => {
    res.render('remove-todo.ejs')
})

router.post('/remove_todo', auth.checkAuthenticated, async (req, res) => {
    try {
        await database.removeToDoByTitle(req.body.title)
        res.redirect('/todos')
    } catch (error) {
        res.render('error.ejs', { error })
    }
})


export default router