var express = require('express');
var router = express.Router();
var usersController = require ("../controllers/users")
const validationNewUser = require ("../middleware/validationNewUser")
const validationUserLogin = require ("../middleware/validationUserLogin")
const guestMiddleware = require('../middleware/guestMiddleware')



router.get('/register', guestMiddleware, usersController.register)
router.post('/register', validationNewUser, usersController.processRegister)

router.get('/login',guestMiddleware, usersController.login)
router.post('/login', validationUserLogin, usersController.processLogin)



module.exports = router;
