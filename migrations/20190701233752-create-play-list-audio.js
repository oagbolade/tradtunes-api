'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PlayListAudios', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      albumName: Sequelize.STRING,
      name: Sequelize.STRING,
      artist: Sequelize.STRING,
      art: Sequelize.STRING,
      audio: Sequelize.STRING,
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',

        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PlayListAudios');
  }
};