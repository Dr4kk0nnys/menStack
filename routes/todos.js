import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
    res.render('todos.ejs', { name: req.user.name })
})

export default router