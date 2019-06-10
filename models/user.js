export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        unqiue: true,
    },
    email: {
        type: DataTypes.STRING,
        unqiue: true,
    },
    password: {
        type: DataTypes.STRING
    },
  });

  User.associate = (models) => {
      User.belongsToMany(models.Team, {
          through: 'member',
          forignKey: 'userId'
      })
  };

  return User;
};