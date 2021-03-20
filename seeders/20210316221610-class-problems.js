'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Classproblems', [{
        inUse: true,
        airDate: new Date('2021-04-01T09:15:00'),
        airDateBonusModifier: 3,
        airDateBonusLength: 45,
        createdAt: new Date(),
        updatedAt: new Date(),
        ClassId: 1,
        ProblemId: 1
      },{
        inUse: true,
        airDate: new Date('2021-04-02T09:15:00'),
        airDateBonusModifier: 3,
        airDateBonusLength: 45,
        createdAt: new Date(),
        updatedAt: new Date(),
        ClassId: 1,
        ProblemId: 2
      },
      {
        inUse: true,
        airDate: new Date('2021-04-03T09:15:00'),
        airDateBonusModifier: 3,
        airDateBonusLength: 45,
        createdAt: new Date(),
        updatedAt: new Date(),
        ClassId: 1,
        ProblemId: 3
      },
      {
        inUse: true,
        airDate: new Date('2021-04-04T09:15:00'),
        airDateBonusModifier: 4,
        airDateBonusLength: 45,
        createdAt: new Date(),
        updatedAt: new Date(),
        ClassId: 2,
        ProblemId: 1
      },{
        inUse: true,
        airDate: new Date('2021-04-05T09:15:00'),
        airDateBonusModifier: 5,
        airDateBonusLength: 60,
        createdAt: new Date(),
        updatedAt: new Date(),
        ClassId: 2,
        ProblemId: 2
      },
      {
        inUse: true,
        airDate: new Date('2021-04-06T09:15:00'),
        airDateBonusModifier: 10,
        airDateBonusLength: 120,
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
