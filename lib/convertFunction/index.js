const isArrowFunc = require('./isArrow');
const isRegular = require("./isRegular");

// const uneval = require("uneval");

const stringToFunc = str => {

  const isArrowObj = isArrowFunc(str);
  if(isArrowObj.isArrow) return new Function(isArrowObj.codeArgs, isArrowObj.codeBody);

  const isRegularObj = isRegular(str);
  if(isRegularObj.isRegular) return new Function(isRegularObj.codeArgs, isRegularObj.codeBody);

  throw new Error ("not a function ---------------")
}


// inputOutput should be an array of objects with the input and output expected
const evaluateFunc = (strFunc, inputOutput) => {
  const fn = stringToFunc(strFunc);
  return inputOutput.map(obj => fn(...obj.input) === obj.output ? { ...obj, eval: true} : { ...obj, eval: false});
}

module.exports = evaluateFunc;