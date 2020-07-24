import express from 'express'
const router = express.Router()


router.get('/', (req, res) => {
    res.render('incorrect-credentials.ejs')
})


export default router