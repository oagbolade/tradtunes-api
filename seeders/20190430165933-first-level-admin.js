'use strict';
const hash = require('../util/hashing')

const password = hash.hashPassword('doe');
module.exports = {
up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('FirstLevelAdmins', [{
      name: 'John',
      password: password,
      createdAt: new Date(),
      updatedAt: new Date(),
      email: 'johnDoe@test.com',
      id: '06c57dbd-b35f-4d53-9088-60d120bcdb81'
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.bulkDelete('FirstLevelAdmins', [{
    }])
  }
};

