var express = require('express');
var router = express.Router();
var usersController = require ("../controllers/users")


router.get('/register', usersController.register)
router.post('/register', usersController.processRegister)

router.get('/login', usersController.login)



module.exports = router;
