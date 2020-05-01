'use strict';
// const sequelize = require('../config/database');
module.exports = (sequelize, DataTypes) => {
  var Video = sequelize.define(
    'Video',
    {
      video: DataTypes.STRING,
      artist: DataTypes.STRING,
      videoId: DataTypes.STRING,
      art: DataTypes.STRING,
      name: DataTypes.STRING,
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
    },
    {
      timestamps: true,
      paranoid: true
    }
  );
  Video.associate = function (models) {
    // associations can be defined here
    models.Video.belongsTo(models.Artist, {
      foreignKey: 'artistId',
    });
    models.Video.belongsTo(models.VideoCat, {
      foreignKey: 'videoCatId',
    });
    models.Video.hasMany(models.VideoLikes, {
      foreignKey: 'videoId',
      as: 'Likes'
    });
    models.Video.hasMany(models.VideoComments, {
      foreignKey: 'videoId',
      as: 'comments'
    });
  };
  return Video
}
