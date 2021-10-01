module.exports = (sequelize, DataTypes) => {
    const alias = 'Genres'

    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING
        }
       
    
    }

    const config = {
       
        
        underscored: true,
        timestamps: false

    }

    const Genero = sequelize.define(alias, cols, config)

    Genero.associate = models => {
        Genero.hasMany (models.Movies, {
            as: 'movies',
            foreingKey: 'genre_id',
            
        })
    }

    return Genero
}