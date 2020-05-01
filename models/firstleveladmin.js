'use strict';
// const sequelize = require('../config/database');
module.exports = (sequelize, DataTypes) => {
  var FirstLevelAdmin = sequelize.define(
    'FirstLevelAdmin',
    {
      name: DataTypes.STRING,
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      },
      password: DataTypes.STRING,
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      deletedAt: {
        type: DataTypes.DATE
      }
    },
    {
      timestamps: true,
      paranoid: true
    }
  );
  FirstLevelAdmin.associate = function (models) {
    // associations can be defined here
  };
  return FirstLevelAdmin;
}


