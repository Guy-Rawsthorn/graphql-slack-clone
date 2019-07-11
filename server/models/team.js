export default (sequelize, DataTypes) => {
    const Team = sequelize.define('team',
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      owner: {
        type: DataTypes.STRING,
      }
    },
  );
  
    Team.associate = (models) => {
        Team.belongsToMany(models.User, {
            through: 'member',
            foreignKey: {
                name: 'teamId',
                field: 'team_id',
              },
        });
        Team.belongsTo(models.User, {
            forignKey: 'owner',
        });
    };
  
    return Team;
  };