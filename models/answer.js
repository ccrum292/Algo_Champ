'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    codeText: DataTypes.STRING,
    correctAnswer: DataTypes.BOOLEAN
  }, {});
  Answer.associate = function(models) {
    Answer.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Answer.belongsTo(models.Problem, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Answer;
};