'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Tests', [{
        input: "hello",
        inputTypeJSON: false,
        output: "HELLO",
        outputTypeJSON: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        ProblemId: 1
      },{
        input: "HELLO",
        inputTypeJSON: false,
        output: "hello",
        outputTypeJSON: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        ProblemId: 2
      },{
        input: "hello",
        inputTypeJSON: false,
        output: "5",
        outputTypeJSON: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        ProblemId: 3
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Tests', null, {});
  }
};
