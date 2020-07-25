function checkAuthenticated(req, res, next) {
    /*
        * isAuthenticated is a function created automatically by passport.js
        * it returns true, if found a session _id for the user
        * In this case, if it's authenticated, it returns the 'go on' function
        * If it's not, it doesn't let the user pass to other pages, and keep it blocked on the /login page
    */
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

// redirect the user if already authenticated
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/todos')
    }
    next()
}


export default {
    checkAuthenticated,
    checkNotAuthenticated
}