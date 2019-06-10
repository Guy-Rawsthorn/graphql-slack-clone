export default (sequelize, DataTypes) => {
    const Team = sequelize.define('team', {
      name: {
          type: DataTypes.STRING,
          unqiue: true,
      },
      owner: {
          type: DataTypes.STRING,
          unqiue: true,
      }
    });
  
    Team.associate = (models) => {
        Team.belongsToMany(models.User, {
            through: 'member',
            forignKey: 'teamId'
        });
        Team.belongsTo(models.User, {
            forignKey: 'owner',
        });
    };
  
    return Team;
  };