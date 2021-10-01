const db = require ('../database/models');

const moviesController = {
    detail: (req,res) => {
        const { id } = req.params
        db.Movies.findByPk(id, {
            include: [{
                association: 'genre',
            }]
        })
        .then(function(movie) {
            res.render("moviesDetail", { movie })
        })
    }

    

}

module.exports = moviesController