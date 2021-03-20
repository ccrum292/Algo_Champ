'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('joinRequests', [{
        ClassId: 1,
        UserId: 1,
        userEmail: "test@test.com",
        pending: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ClassId: 1,
        UserId: 4,
        userEmail: "test4@test.com",
        pending: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ClassId: 1,
        UserId: 5,
        pending: true,
        userEmail: "ccrum292@gmail.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        ClassId: 1,
        UserId: 6,
        pending: true,
        userEmail: "test5@test.com",
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('joinRequests', null, {});
  }
};
