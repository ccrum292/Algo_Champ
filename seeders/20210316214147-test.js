'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Tests', [{
        input: "hello",
        inputType: "string",
        output: "HELLO",
        outputType: "string",
        createdAt: new Date(),
        updatedAt: new Date(),
        ProblemId: 1
      },{
        input: "HELLO",
        inputType: "string",
        output: "hello",
        outputType: "string",
        createdAt: new Date(),
        updatedAt: new Date(),
        ProblemId: 2
      },{
        input: "hello",
        inputType: "string",
        output: "5",
        outputType: "number",
        createdAt: new Date(),
        updatedAt: new Date(),
        ProblemId: 3
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Tests', null, {});
  }
};
