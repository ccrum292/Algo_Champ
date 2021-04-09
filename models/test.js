'use strict';
module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define('Test', {
    input: DataTypes.STRING,
    inputTypeJSON: DataTypes.BOOLEAN,
    output: DataTypes.STRING,
    outputTypeJSON: DataTypes.BOOLEAN
  }, {});
  Test.associate = function(models) {
    Test.belongsTo(models.Problem, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Test;
};