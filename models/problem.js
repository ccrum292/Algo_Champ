'use strict';
module.exports = (sequelize, DataTypes) => {
  const Problem = sequelize.define('Problem', {
    title: {
      type: DataTypes.STRING,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: "Description Here"
    },
    startingCode: {
      type: DataTypes.STRING,
      defaultValue: "// Hello World"
    },
    difficulty: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
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