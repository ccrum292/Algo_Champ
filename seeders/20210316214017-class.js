'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Classes', [{
        name: "Test Class",
        description: "This is a test class for development only.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Test Class 2",
        description: "This is a test class for development only.",
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Classes', null, {});
  }
};
