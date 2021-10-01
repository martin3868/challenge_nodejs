module.exports = (sequelize, DataTypes) => {
    const alias = "Actors"

    const cols = {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        created_at: {
            type: DataTypes.DATE,
        },
        updated_at: {
            type: DataTypes.DATE,
        },
        first_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
        },
        rating: {
            type: DataTypes.DECIMAL
        }
    };

        const config = {
            underscored: true,
            timestamps: false,
          
            
            
        };

        const Actor = sequelize.define(alias, cols, config );
        Actor.associate = models => {
        Actor.belongsToMany(models.Movies, {
            as: 'movies',
            through: 'actor_movie',
            foreignKey: 'actor_id', // fk de actor dentro de la tabla pivote
            otherKey: 'movie_id',
            timestamps: false, // tabla pivot
        })
    }

        return Actor;
}