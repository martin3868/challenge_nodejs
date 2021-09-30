const { DataTypes } = require("sequelize/types")

module.exports = (sequelize, DataTypes) => {
    const alias = "Movie"

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
        tableName: "moives",
        
    }

    const Movie = sequelize.define(alias, cols, config );

    return Movie;
}