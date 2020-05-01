"use strict";
module.exports = (sequelize, DataTypes) => {
  var Admin = sequelize.define(
    "Admin",
    {
      name: DataTypes.STRING,
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      password: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      deletedAt: {
        type: DataTypes.DATE
      }
    },
    {
      // hooks:{
      //   beforeCreate: async function (admin) {
      //     const salt = await bcrypt.genSalt(10); //whatever number you want
      //     admin.password = await bcrypt.hash(admin.password, salt);
      //   }

      // },

      timestamps: true,
      paranoid: true
    }
  );
  Admin.associate = function(models) {
    // associations can be defined here
  };

  return Admin;
};
