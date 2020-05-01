'use strict';
module.exports = (sequelize, DataTypes) => {
  const VideoLikes = sequelize.define('VideoLikes', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: DataTypes.UUID
  }, {});
  VideoLikes.associate = function (models) {
    // associations can be defined here
    models.VideoLikes.belongsTo(models.Video, {
      foreignKey: 'videoId',
    });
  };
  return VideoLikes;
};