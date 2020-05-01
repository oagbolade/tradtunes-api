'use strict';
module.exports = (sequelize, DataTypes) => {
  const AudioComments = sequelize.define('AudioComments', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    audioId: DataTypes.UUID,
    text: DataTypes.STRING,
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    userId: DataTypes.UUID
  }, {});
  AudioComments.associate = function (models) {
    // associations can be defined here
    models.AudioComments.belongsTo(models.Audio, {
      foreignKey: 'audioId',
    });
  };
  return AudioComments;
};