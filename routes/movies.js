var express = require('express');

var router = express.Router();
const moviesController = require ("../controllers/movies")

// Detalle de peliculas //
router.get('/detail/:id', moviesController.detail);

// Crear Pelicula // 
router.get('/new', moviesController.new);
router.post('/new', moviesController.store);

// Editar Pelicula //
router.get('/edit/:id', moviesController.edit);
router.post('/edit/:id', moviesController.update);

// Borrar Pelicula //
router.post('/delete/:id', moviesController.delete)

module.exports = router
