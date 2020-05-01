'use strict';
// const sequelize = require('../config/database');
module.exports = (sequelize, DataTypes) => {
  var Artist = sequelize.define(
    'Artist',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      sex: DataTypes.STRING,
      stageName: DataTypes.STRING,
      avatar: DataTypes.STRING,
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      }
    },
    {
      timestamps: true,
      paranoid: true
    }
  );

  Artist.associate = function (models) {
    // associations can be defined here
    models.Artist.hasMany(models.Video, {
      foreignKey: 'artistId',
      as: 'videos'
    });
    models.Artist.hasMany(models.Audio, {
      foreignKey: 'artistId',
      as: 'audios'
    });
    models.Artist.hasMany(models.Album, {
      foreignKey: 'artistId',
      as: 'albums'
    });
  };
  return Artist;
}

