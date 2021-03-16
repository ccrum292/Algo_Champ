'use strict';
module.exports = (sequelize, DataTypes) => {
  const Example = sequelize.define('Example', {
    displayValue: DataTypes.STRING
  }, {});
  Example.associate = function(models) {
    Example.belongsTo(models.Problem, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Example;
};