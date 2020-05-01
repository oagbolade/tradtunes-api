'use strict';
// const sequelize = require('../config/database');

module.exports = (sequelize, DataTypes) => {
  var AudioCat = sequelize.define('AudioCat', {
    name: sequelize.Sequelize.STRING,
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    }
  },
    {

      timestamps: true,
      paranoid: true

    }
  );
  AudioCat.associate = function (models) {
    // associations can be defined here
    models.AudioCat.hasMany(models.Audio, {
      foreignKey: 'audioCatId',
      as: 'audio'
    });
  };
  return AudioCat;
}

