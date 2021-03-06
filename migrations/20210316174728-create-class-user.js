'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ClassUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      owner: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      score: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      algorithmsCompleted: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      UserId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      ClassId: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ClassUsers');
  }
};