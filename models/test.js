'use strict';
module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define('Test', {
    input: DataTypes.STRING,
    inputType: DataTypes.STRING,
    output: DataTypes.STRING,
    outputType: DataTypes.STRING
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