'use strict';
module.exports = (sequelize, DataTypes) => {
  const Problem = sequelize.define('Problem', {
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: "Description Here"
    },
    startingCode: {
      type: DataTypes.STRING(1234),
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
    Problem.belongsToMany(models.User, {
      through: models.Answer
    });
    Problem.hasMany(models.ClassProblem, {});
  };
  return Problem;
};