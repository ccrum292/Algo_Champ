'use strict';
module.exports = (sequelize, DataTypes) => {
  const ClassUser = sequelize.define('ClassUser', {
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    algorithmsCompleted: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  }, {});
  ClassUser.associate = function(models) {
    // associations can be defined here
  };
  return ClassUser;
};