   const { validationResult } = require('express-validator');
   const bcrypt = require('bcryptjs')
   const db = require("../database/models");
   const { maxAgeUserCookie } = require ("../config/config")
   
   
   const usersController = {
        register: (req, res) => {
            res.render('user/usersRegister')
        },

        processRegister: (req, res) => {                                    
            const formValidation = validationResult(req)
            
            //si encuentro un error devuelvo el formulario con los valores ya cargados y los errores.

            if (!formValidation.isEmpty()) {
               // borrar imagen
            if (req.file) {
                // primero chequeamos que exista
                fs.unlinkSync(req.file.path)
            }
               
                res.render('user/usersRegister', { oldValues: req.body, errors: formValidation.mapped() })
            }

            //crear el objeto usuario
            const { name,  email, password} = req.body;   
            const { file } = req
            const image = file.filename  

            //hashear el password
           const hashPassword = bcrypt.hashSync(password)
      
            const user = {
                name: name,
                email: email,
                password: hashPassword,
                image: "/images/imgUser/" + image,
                
            }

            db.Users.create(user)
                .then(() => {
                    res.redirect('/');
                }) 
        },
        login: (req, res) => {
            res.render('user/usersLogin')

        },
        processLogin: (req, res) => {
            const formValidation = validationResult(req)
        const oldValues = req.body

        if (!formValidation.isEmpty()) {
            return res.render('user/usersLogin', { oldValues, errors: formValidation.mapped() })
        }
        // lo que viene del login
        const { email, remember } = req.body
        // le pedimos al modelo el usuario
        //const user = usersModels.findByField('email', email)
        db.Users.findOne({
            where: {
                email
            }
        })
        .then((user) => {
            //req.session = {}
            // cargamos los datos del usuario en la sesi??n
            // le sacamos el password
            delete user.password

            // cargamos dentro de la sesi??n la propieda logged con el usuario (menos el password)
            req.session.logged = user
           
            // guardamos un dato de nuestro usuario en la sesi??n (email, user_id)
            if (remember) {
            //     // clave
                 res.cookie('user', user.id, {
                   maxAge: maxAgeUserCookie,
            //         // pasamos esta propiedad para que firme la cookie
                 //  signed: true,
                })
             }
            //redirigimos al profile
            res.redirect('/users/profile')
        })
    },
    logout: (req, res) => {
        // borrar session y cookie
        req.session.destroy()
        res.clearCookie('user')
        res.redirect('/')
    },
    profile: (req, res) => {
        res.render ('user/profile')
    }


        
    }

    module.exports = usersController