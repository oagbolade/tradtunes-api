'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Videos', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      video: {
        type: Sequelize.STRING
      },
      videoId: {
        type: Sequelize.STRING
      },
      videoCatId: {
        type: Sequelize.UUID,
        references: {
          model: 'VideoCats',
          key: 'id',
        }
      },
      artistId: {
        type: Sequelize.UUID,
        // onDelete: "CASCADE",
        references: {
          model: 'Artists',
          key: 'id',
        }

      },
      name: {
        type: Sequelize.STRING
      },
      art: {
        type: Sequelize.STRING
      },
      artist: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Videos');
  }
};
