function checkAuthenticated(req, res, next) {
    // return true if the user is authenticated
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}
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