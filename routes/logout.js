import express from 'express'
const router = express.Router()

router.delete('/logout', (req, res) => {
    /*
        * Delete is the correct way of deleting sessions
        * The req.logOut function is set by passport automatically
        * It clears the session, and log the user out
        * And after that, it redirects the user out to the /login page
    */
    req.logOut()
    res.redirect('/login')
})

export default router