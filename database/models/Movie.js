

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
        tableName: "movies",
        
    }

    const Pelicula = sequelize.define(alias, cols, config );


    return Pelicula;
}