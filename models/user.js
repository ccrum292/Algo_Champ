'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.belongsToMany(models.Class, {
      through: models.ClassUser
    });
    User.hasMany(models.Answer, {
      onDelete: "cascade"
    });
    User.hasMany(models.joinRequest, {
      onDelete: "cascade"
    });
    User.belongsToMany(models.Problem, {
      through: models.Answer
    });
  };
  return User;
};