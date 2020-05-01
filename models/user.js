'use strict';
// const sequelize = require('../config/database');
module.exports = (sequelize, DataTypes) => {
  var bcrypt = require('bcryptjs');

  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      phone: {
        type: DataTypes.STRING(11),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      },
      password: DataTypes.STRING,
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
      hooks: {
        beforeCreate: async function(user) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },

      timestamps: true,
      paranoid: true
    }
  );
  User.associate = function (models) {
    // associations can be defined here

  };
  return User;
}
  // module.exports = User;