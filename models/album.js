'use strict';
// const sequelize = require('../config/database');
module.exports = (sequelize, DataTypes) => {
  var Album = sequelize.define(
    'Album',
    {
      albumName: sequelize.Sequelize.STRING,
      art: sequelize.Sequelize.STRING,
      artist: sequelize.Sequelize.STRING,
      id: {
        allowNull: false,
        primaryKey: true,
        type: sequelize.Sequelize.UUID,
        defaultValue: sequelize.Sequelize.UUIDV4
      }
    },
    {
      timestamps: true,
      paranoid: true
    }
  );
  Album.associate = function (models) {
    // associations can be defined here
    models.Album.belongsTo(models.Artist, {
      // onDelete: "CASCADE",
      foreignKey: 'artistId',

    });

    models.Album.hasMany(models.Audio, {
      foreignKey: 'albumId',
      as: 'songs',
    });
  };
  return Album;
}

