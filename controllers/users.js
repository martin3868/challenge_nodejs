   const { validationResult } = require('express-validator');
   const bcrypt = require('bcryptjs')
   const db = require("../database/models")
   
   
   const usersController = {
        register: (req, res) => {
            res.render('usersRegister')
        },

        processRegister: (req, res) => {                                    
            const formValidation = validationResult(req)
            
            //si encuentro un error devuelvo el formulario con los valores ya cargados y los errores.

            if (!formValidation.isEmpty()) {
                res.render('usersRegister', { oldValues: req.body, errors: formValidation.mapped() })
            }

            //crear el objeto usuario
            const { name,  email, password} = req.body;     

            //hashear el password
           const hashPassword = bcrypt.hashSync(password)
      
            const user = {
                name: name,
                email: email,
                password: hashPassword
                
            }

            db.Users.create(user)
                .then(() => {
                    res.redirect('/');
                }) 
        },
        login: (req, res) => {
            res.render('usersLogin')

        },
        processLogin: (req, res) => {


        }
    }

    module.exports = usersController