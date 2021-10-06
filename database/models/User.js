module.exports = (sequelize, DataTypes) => {
    const alias = "Users"

    const cols = {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.INTEGER,
        },
        password: {
            type: DataTypes.INTEGER
        },
        image: {
            type: DataTypes.STRING
        }
      
       
    };

    const config = {
        underscored: true,
        timestamps: false,
        
        
    }

    const User = sequelize.define(alias, cols, config );

 


    return User;
}