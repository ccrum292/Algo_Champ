'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Classusers', [{
        admin: false,
        score: 0,
        algorithmsCompleted: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1,
        ClassID: 1,
      },
      {
        admin: false,
        score: 0,
        algorithmsCompleted: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 2,
        ClassID: 1,
      },{
        admin: true,
        score: 0,
        algorithmsCompleted: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 3,
        ClassID: 1,
      },
      {
        admin: false,
        score: 0,
        algorithmsCompleted: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1,
        ClassID: 2,
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Classusers', null, {});
  }
};
