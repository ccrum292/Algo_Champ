const isArrowFunc = require('./isArrow');
const isRegular = require("./isRegular");

const stringToFunc = str => {

  const isArrowObj = isArrowFunc(str);
  if(isArrowObj.isArrow) return new Function(isArrowObj.codeArgs, isArrowObj.codeBody);

  const isRegularObj = isRegular(str);
  if(isRegularObj.isRegular) return new Function(isRegularObj.codeArgs, isRegularObj.codeBody);

}

module.exports = stringToFunc;