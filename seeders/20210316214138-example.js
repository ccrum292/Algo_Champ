'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Examples', [{
        displayValue: "give some input, we want some output.",
        createdAt: new Date(),
        updatedAt: new Date(),
        ProblemId: 1
      },{
        displayValue: "give some input, we want some output.",
        createdAt: new Date(),
        updatedAt: new Date(),
        ProblemId: 1
      },{
        displayValue: "give some input, we want some output.",
        createdAt: new Date(),
        updatedAt: new Date(),
        ProblemId: 1
      },{
        displayValue: "give some input, we want some output.",
        createdAt: new Date(),
        updatedAt: new Date(),
        ProblemId: 2
      },{
        displayValue: "give some input, we want some output.",
        createdAt: new Date(),
        updatedAt: new Date(),
        ProblemId: 2
      },{
        displayValue: "give some input, we want some output.",
        createdAt: new Date(),
        updatedAt: new Date(),
        ProblemId: 2
      },{
        displayValue: "give some input, we want some output.",
        createdAt: new Date(),
        updatedAt: new Date(),
        ProblemId: 3
      },{
        displayValue: "give some input, we want some output.",
        createdAt: new Date(),
        updatedAt: new Date(),
        ProblemId: 3
      },{
        displayValue: "give some input, we want some output.",
        createdAt: new Date(),
        updatedAt: new Date(),
        ProblemId: 3
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Examples', null, {});
  }
};
