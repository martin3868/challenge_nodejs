   
   const bcrypt = require('bcryptjs')
   const db = require("../database/models")
   
   
   const usersController = {
        register: (req, res) => {
            res.render('usersRegister')
        },

        processRegister: (req, res) => {

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
                    res.send(hashPassword);
                }) 
        },
        login: (req, res) => {
            res.render('usersLogin')

        },
        processLogin: (req, res) => {


        }
    }

    module.exports = usersController