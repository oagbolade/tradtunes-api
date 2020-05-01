'use strict';
// const sequelize = require('../config/database');

module.exports = (sequelize, DataTypes) => {
  const VideoCat = sequelize.define('VideoCat', {
    name: DataTypes.STRING,
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    }
  }, {

      timestamps: true,
      paranoid: true
    });
  VideoCat.associate = function (models) {
    // associations can be defined here
    models.VideoCat.hasMany(models.Video, {
      foreignKey: 'videoCatId',
      as: 'video'
    });
  };
  return VideoCat;
}

