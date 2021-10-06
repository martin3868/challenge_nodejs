var express = require('express');
var router = express.Router();
var usersController = require ("../controllers/users")
const multer = require('multer');
const path = require('path');
const { isFileImage } = require('../helpers/file')

const validationNewUser = require ("../middleware/validationNewUser")
const validationUserLogin = require ("../middleware/validationUserLogin")
const guestMiddleware = require('../middleware/guestMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // guardamos el destino de la carpeta absoluta
        const destinationPath = path.join(__dirname, '../public/images/imgUser')
        //llamamos al callback con error (null) y el path de donde se almacenara.
        cb(null, destinationPath)
    },
    filename: (req, file, cb) => {
        // El nombre del archivo original es: file.originalname
        const extension = path.extname(file.originalname) // .jpg
        // generamos un identificador unico a partir de la fecha
        const now = Date.now()

        // generamos un nombre para nuestro archivo
        const filename = now + extension

        //ejecutamos callback con null (error) y el nombre del archivo
        cb(null, filename)

    },
});

// fileFilter es un byPass para que multer guarde o no el archivo
const fileFilter = (req, file, cb) => {
    if (!file) {
        cb(null, false)
        // corta la ejecucion
        return
    }

    if (!isFileImage(file.originalname)) {
        // para que llegue a express-validator el archivo
        req.file = file
        
        cb(null, false)
        
        // corta la ejecucion
        return

    }

    // si aceptamos el archivo
    cb(null, true)
}

const upload = multer({ storage, fileFilter });

router.get('/register', guestMiddleware, usersController.register)
// aca debemos pasar multer
router.post('/register', upload.single('image'), validationNewUser, usersController.processRegister)

router.get('/login',guestMiddleware, usersController.login)
router.post('/login', validationUserLogin, usersController.processLogin)

router.get('/profile',authMiddleware, usersController.profile)
router.get('/logout', authMiddleware, usersController.logout)

module.exports = router;
