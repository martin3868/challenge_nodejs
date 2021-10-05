module.exports = (req, res, next) => {
    //si tenemos usuario en la sesion lo pasamos
    //a locals para que pueda usarse desde los templates
    //console.log(req.session)

    if (req.session.logged) {
        res.locals.logged = req.session.logged
    }

    next()
}