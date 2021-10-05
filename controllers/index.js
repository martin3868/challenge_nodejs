const db = require ("../database/models");

const indexController = {
    list: (req, res) => {
        db.Movies.findAll()
        .then(function(movies) {
            res.render('main/index', { movies })
        })

    }
}


module.exports = indexController