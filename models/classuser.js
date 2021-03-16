'use strict';
module.exports = (sequelize, DataTypes) => {
  const ClassUser = sequelize.define('ClassUser', {
    admin: DataTypes.BOOLEAN,
    score: DataTypes.INTEGER
  }, {});
  ClassUser.associate = function(models) {
    // associations can be defined here
  };
  return ClassUser;
};