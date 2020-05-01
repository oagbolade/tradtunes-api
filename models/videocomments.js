'use strict';
module.exports = (sequelize, DataTypes) => {
  const VideoComments = sequelize.define('VideoComments', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    text: DataTypes.STRING,
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    userId: DataTypes.UUID

  }, {});
  VideoComments.associate = function (models) {
    // associations can be defined here
    models.VideoComments.belongsTo(models.Video, {
      foreignKey: 'videoId',
    });
  };
  return VideoComments;
};