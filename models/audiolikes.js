'use strict';
module.exports = (sequelize, DataTypes) => {
  const AudioLikes = sequelize.define('AudioLikes', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: DataTypes.UUID
  }, {});
  AudioLikes.associate = function (models) {
    // associations can be defined here
    models.AudioLikes.belongsTo(models.Audio, {
      foreignKey: 'audioId',
    });
  };
  return AudioLikes;
};