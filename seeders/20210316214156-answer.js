'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Answers', [{
        codeText: "function toUpperCase() {1}",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1,
        ProblemId: 1
      },{
        codeText: "function toUpperCase() {2}",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 2,
        ProblemId: 1
      },
      {
        codeText: "function toLowerCase() {1}",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1,
        ProblemId: 2
      },{
        codeText: "function toLowerCase() {2}",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 2,
        ProblemId: 2
      },{
        codeText: `// Hello 
        function countCharacters() {
          1
        }`,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 1,
        ProblemId: 3
      },{
        codeText: "function toUpperCase() {2}",
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: 2,
        ProblemId: 3
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Answers', null, {});
  }
};
