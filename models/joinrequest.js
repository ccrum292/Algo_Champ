'use strict';
module.exports = (sequelize, DataTypes) => {
  const joinRequest = sequelize.define('joinRequest', {
    ClassId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    userEmail: DataTypes.STRING,
    pending: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {});
  joinRequest.associate = function(models) {
    joinRequest.belongsTo(models.Class, {
      foreignKey: {
        allowNull: false
      }
    });
    joinRequest.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return joinRequest;
};