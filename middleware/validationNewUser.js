const { body } = require ('express-validator');
const db = require('../database/models');
const { isFileImage } = require('../helpers/file');

const validationNewUser = [

    body('name')
        .notEmpty()
        .withMessage('Debe ingresar su nombre')
        .bail()
        //
        .isLength({ min: 4 })
        .withMessage('Debe ingresar un nombre mayor a 3 caracteres'),
        //como es la ultima no usamos bail.
    body('email')
        .notEmpty()
        .withMessage('Por favor ingrese su email')
        .bail()
        .isEmail()
        .withMessage('Ingrese un mail valido')
        .bail()
        .custom(async (value, { req }) => {
            const { email } = req.body
            const userFound = await db.Users.findOne ({
                where: {
                    email
                }
            })

            if (userFound) {
                return Promise.reject('El mail ya esta en uso')
            }

                return true
        }),
     
         
    body('password')
        .notEmpty()
        .withMessage('Por favor ingrese su contraseña'),
        

    body('image')
        .custom((value, { req }) => {
            const { file } = req

            // chequea que haya cargado imagen
            if (!file) {
                // esto es como si hicieramos .withMessage('Seleccione un archivo')
                throw new Error('Por favor ingrese una imagen')
            }
            /*if (!isFileImage(file.originalname)) {
                // disparar error
                throw new Error('Por favor ingrese una archivo que sea una imagen')
            }
            chequea que la extensión sea la correcta
            const avalaible_extensions = [".jpg", ".jpeg", ".gif", "png"];
            const extension = path.extname(file.originalname);
            if(avalaible_extensions.includes(extension)){
                throw new Error('Por favor ingrese una archivo que sea una imagen');
            };
            return true;*/
            if (!isFileImage(file.originalname)) {
                // disparar error
                throw new Error('Por favor ingrese una archivo que sea una imagen')
            }

            // chequea que la extensión sea la correcta

            return true;
        })    
]

module.exports = validationNewUser;