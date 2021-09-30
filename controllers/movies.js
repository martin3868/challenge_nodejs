const db = require ('../database/models');

const moviesController = {
    detail: (req,res) => {
        db.Movies.findByPk(req.params.id)
        .then(function(movie) {
            res.render("moviesDetail", { movie })
        })
    }

    

}

module.exports = moviesController