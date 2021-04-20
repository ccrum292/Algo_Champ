'use strict';
module.exports = (sequelize, DataTypes) => {
  const ClassProblem = sequelize.define('ClassProblem', {
    inUse: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    airDate: {
      type: DataTypes.DATE
    },
    airDateBonusModifier: {
      type: DataTypes.INTEGER,
      defaultValue: 2
    },
    airDateBonusLength: {
      type: DataTypes.INTEGER,
      defaultValue: 45
    }
  }, {});
  ClassProblem.associate = function(models) {
    ClassProblem.belongsTo(models.Problem, {
      foreignKey: {
        allowNull: false
      }
    });
    ClassProblem.belongsTo(models.Class, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return ClassProblem;
};