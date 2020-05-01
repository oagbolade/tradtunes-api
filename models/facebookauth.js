"use strict";
// const sequelize = require('../config/database');
module.exports = (sequelize, DataTypes) => {
  const Facebook_auth = sequelize.define(
    "facebookauth",
    {
      name: DataTypes.STRING,
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      phone: {
        type: DataTypes.STRING(11)
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      },
      avatar: DataTypes.STRING,
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      deletedAt: {
        type: DataTypes.DATE
      }
    },
    {
      hooks: {},

      timestamps: true,
      paranoid: true
    },
  );
  Facebook_auth.associate = function(models) {
    // associations can be defined here
  };
  return Facebook_auth;
};
// module.exports = User;
