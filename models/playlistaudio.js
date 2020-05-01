'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlayListAudio = sequelize.define('PlayListAudio', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    albumName: DataTypes.STRING,
    name: DataTypes.STRING,
    artist: DataTypes.STRING,
    art: DataTypes.STRING,
    audio: DataTypes.STRING,

  }, {});
  PlayListAudio.associate = function (models) {
    // // associations can be defined here
    PlayListAudio.belongsTo(models.User, { foreignKey: 'userId' })


  };
  return PlayListAudio;
};