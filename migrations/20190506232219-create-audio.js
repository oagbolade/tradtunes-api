'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Audios', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      audio: {
        type: Sequelize.STRING
      },
      artistId: {
        type: Sequelize.UUID,
        // onDelete: "CASCADE",
        references: {
          model: 'Artists',
          key: 'id',

        }
      },
      audioCatId: {
        type: Sequelize.UUID,
        references: {
          model: 'AudioCats',
          key: 'id',
        }
      },
      artist: {
        type: Sequelize.UUID
      },
      albumId: {
        type: Sequelize.UUID,
        // onDelete: "CASCADE",
        references: {
          model: 'Albums',
          key: 'id',

        }
      },
      audioId: {
        type: Sequelize.STRING
      },
      art: {
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
    return queryInterface.dropTable('Audios');
  }
};
