var express = require('express');
var router = express.Router();
var usersController = require ("../controllers/users")


/* GET users listing. */
router.get('/register', usersController.register)
router.post('/register', usersController.processRegister)

module.exports = router;
