'use strict';
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: DataTypes.STRING
  }, {});
  Class.associate = function(models) {
    Class.belongsToMany(models.User, {
      through: models.ClassUser
    });
    Class.belongsToMany(models.Problem, {
      through: models.ClassProblem
    });
  };
  return Class;
};