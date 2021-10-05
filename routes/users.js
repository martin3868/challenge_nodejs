var express = require('express');
var router = express.Router();
var usersController = require ("../controllers/users")
const validationNewUser = require ("../middleware/validationNewUser")

router.get('/register', usersController.register)
router.post('/register', validationNewUser, usersController.processRegister)

router.get('/login', usersController.login)



module.exports = router;
