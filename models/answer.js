'use strict';
module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    codeText: DataTypes.STRING,
    correctAnswer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    points: DataTypes.INTEGER
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
      }, 
    });
  };
  return Answer;
};