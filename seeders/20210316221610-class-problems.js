'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Classproblems', [{
        inUse: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        ClassId: 1,
        ProblemId: 1
      },{
        inUse: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        ClassId: 1,
        ProblemId: 2
      },
      {
        inUse: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        ClassId: 1,
        ProblemId: 3
      },
      {
        inUse: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        ClassId: 2,
        ProblemId: 1
      },{
        inUse: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        ClassId: 2,
        ProblemId: 2
      },
      {
        inUse: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        ClassId: 2,
        ProblemId: 3
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Classproblems', null, {});
  }
};
