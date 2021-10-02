const db = require ('../database/models');

const moviesController = {
    detail: (req,res) => {
        const { id } = req.params
        db.Movies.findByPk(id, {
            include: [{
                association: 'genre',
            },
            {
                association: "actors"
            }

        ]
        })
        .then(function(movie) {
            res.render("moviesDetail", { movie })
        })
    },
    new: (req, res) => {
        db.Genres.findAll()
            .then(function(genres) {
                 res.render("newMovie", { genres })
            })

    },
    store: (req, res) => {
        const movie = {
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            length: req.body.length,
            release_date: req.body.release_date,        
            genre_id:req.body.genre
        };
            
        db.Movies.create(movie)
            .then((movieCreated) => {
                res.redirect('/movies/detail/' + movieCreated.id);
            })
    },

    edit: async (req, res) => {
        const { id } = req.params


        const movie = await db.Movies.findByPk(id)
        const genres = await db.Genres.findAll()
        const actors = await db.Actors.findAll ()

        res.render ('editMovie', {
            movie,
            genres,
            actors
        });
    },

    update: async (req, res) => {

       const { id } = req.params
        const movie = {
            title: req.body.title,
            rating: req.body.rating,
            awards: req.body.awards,
            length: req.body.length,
            release_date: req.body.release_date,        
            genre_id:req.body.genre
        };
            
        db.Movies.update(movie, {
            where : {
                id:id
            }
        })
            
                res.redirect('/movies/detail/' + id);
            
    },
    delete: (req, res) => {
        const id = req.params.id;

        db.Movies.destroy({
            where: {
                id: id
            }
        })
        
        
            res.redirect('/');
        
        
    }

    

}

module.exports = moviesController