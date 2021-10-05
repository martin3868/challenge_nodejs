const { body } = require ('express-validator');
const db = require('../database/models');


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
        .withMessage('Por favor ingrese su contraseña')
        

]

module.exports = validationNewUser;