'use strict';
// const sequelize = require('../config/database');
module.exports = (sequelize, DataTypes) => {
  var Audio = sequelize.define(
    'Audio',
    {
      audio: DataTypes.STRING,
      name: DataTypes.STRING,
      art: DataTypes.STRING,
      artist: DataTypes.STRING,
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      audioId: DataTypes.STRING,
    },
    {
      timestamps: true,
      paranoid: true
    }
  );
  Audio.associate = function (models) {
    // associations can be defined here
    models.Audio.belongsTo(models.Artist, {
      // onDelete: "CASCADE",
      foreignKey: 'artistId',

    });
    models.Audio.belongsTo(models.Album, {
      // onDelete: "CASCADE",
      foreignKey: 'albumId',

    });

    models.Audio.belongsTo(models.AudioCat, {
      // onDelete: "CASCADE",
      foreignKey: 'audioCatId',

    });
    models.Audio.hasMany(models.AudioLikes, {
      foreignKey: 'audioId',
      as: 'Likes'
    });
    models.Audio.hasMany(models.AudioComments, {
      foreignKey: 'audioId',
      as: 'comments'
    });


  };

  return Audio;
}

