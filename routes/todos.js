import auth from '../utils/auth.js'

import express from 'express'
const router = express.Router()

import Database from '../utils/database.js'
const database = new Database()

router.get('/', auth.checkAuthenticated, async (req, res) => {
    try {
        const user_id = String(req.user._id)
        const todos = await database.getToDosByUserID(user_id).toArray()

        const { name } = req.user

        /*
            * The todos.ejs file loads the todos list onload


            * The user_id is used to store the todos for each individually user.
            * The todos are searched through the getToDosByUserID, passing the user's id as parameter
                * the parameter can be passed, since the passport.js offers this possibility
                * to take the user object from the req
            * The GetTodos ... function loops through the entire collection of todos
            * looking for every todo with the user_id being the same as the user's id


            * How the todo is stored:
            {
                _id: $3j2124j2lk1sa4201D312ds$,
                user_id: user._id, // id of the todos owner
                title: 'ToDo Title',
                description: 'ToDo Description ...'
            }


            * The name is also passed to the todos.ejs file
            * But only for aesthetic purposes ( not really necessary )
        */
        res.render('todos.ejs', { name, todos })
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