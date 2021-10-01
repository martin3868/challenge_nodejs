var express = require('express');

var router = express.Router();
const moviesController = require ("../controllers/movies")

// Detalle de peliculas //
router.get('/detail/:id', moviesController.detail);

module.exports = router
