'use strict';
module.exports = (sequelize, DataTypes) => {
  const ClassProblem = sequelize.define('ClassProblem', {
    inUse: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {});
  ClassProblem.associate = function(models) {
    // associations can be defined here
  };
  return ClassProblem;
};