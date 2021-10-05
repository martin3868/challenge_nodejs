const db = require ('../database/models')

module.exports = (req, res, next) => {
    // chequeamos si existe cookie
    const userCookie = req.cookies.user
    console.log('terribleUserCookie', userCookie)

    // si existe buscamos en el modelo el usuario
    if (userCookie) {

        const user = db.Users.findByPk(userCookie)
            .then(user => {
                // borramos el password
                delete user.password
                //pasar a la session
                req.session.logged = user
                next();
            })
        console.log('UsuarioQueSalioDeLaCokieeee', user)
     

    } else {
        next()
    }


   
   
}