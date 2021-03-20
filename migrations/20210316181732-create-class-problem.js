'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ClassProblems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      inUse: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      airDate: {
        type: Sequelize.DATE
      },
      airDateBonusModifier: {
        type: Sequelize.INTEGER,
        defaultValue: 2
      },
      airDateBonusLength: {
        type: Sequelize.INTEGER,
        defaultValue: 45
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      ClassId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      ProblemId: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ClassProblems');
  }
};