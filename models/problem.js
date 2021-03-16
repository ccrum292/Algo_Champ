'use strict';
module.exports = (sequelize, DataTypes) => {
  const Problem = sequelize.define('Problem', {
    title: {
      type: DataTypes.STRING,
      unique: true
    },
    description: DataTypes.STRING,
    startingCode: DataTypes.STRING
  }, {});
  Problem.associate = function(models) {
    Problem.hasMany(models.Answer, {
      onDelete: "cascade"
    });
    Problem.belongsToMany(models.Class, {
      through: models.ClassProblem
    });
    Problem.hasMany(models.Example, {
      onDelete: "cascade"
    });
    Problem.hasMany(models.Test, {
      onDelete: "cascade"
    });
  };
  return Problem;
};