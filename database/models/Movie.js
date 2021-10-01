

module.exports = (sequelize, DataTypes) => {
    const alias = "Movies"

    const cols = {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        
        title: {
            type: DataTypes.STRING,
        },
        rating: {
            type: DataTypes.DECIMAL,
        },
        awards: {
            type: DataTypes.INTEGER,
        },
        release_date: {
            type: DataTypes.DATE,
        },
        length: {
            type: DataTypes.INTEGER,
        },
        genre_id: {
            type: DataTypes.INTEGER,
        }
    };

    const config = {
        underscored: true,
        timestamps: false,
        
        
    }

    const Pelicula = sequelize.define(alias, cols, config );

    Pelicula.associate = models => {
        Pelicula.belongsTo(models.Genres, {
          as: 'genre',
          foreingKey: 'genre_id'  
        })
    }



    return Pelicula;
}