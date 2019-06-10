export default (sequelize, DataTypes) => {
    const Message = sequelize.define('message', {
      text: {
          type: DataTypes.STRING,
      }
    });
  
    Message.associate = (models) => {
        Message.belongsTo(models.Channel, {
            forignKey: 'channelId'
        });
        Message.belongsTo(models.User, {
            forignKey: 'userId',
        });
    };
  
    return Message;
  };