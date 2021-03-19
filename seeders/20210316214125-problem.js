'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Problems', [{
        title: "Test Problem 1",
        description: "Your problem text goes here.",
        startingCode: "// Hello World",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Test Problem 2",
        description: "Your problem text goes here.",
        startingCode: "// Hello World",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Test Problem 3",
        description: "Your problem text goes here.",
        startingCode: "// Hello World",
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Problems', null, {});
  }
};
