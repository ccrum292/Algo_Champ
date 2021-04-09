const isArrowFunc = require('./isArrow');
const isRegular = require("./isRegular");

const uneval = require("uneval");
const isJsonStr = require("../../lib/isJsonStr");

const stringToFunc = str => {

  const isArrowObj = isArrowFunc(str);
  if(isArrowObj.isArrow) return new Function(isArrowObj.codeArgs, isArrowObj.codeBody);

  const isRegularObj = isRegular(str);
  if(isRegularObj.isRegular) return new Function(isRegularObj.codeArgs, isRegularObj.codeBody);

  throw new Error ("not a function ---------------")
}


// inputOutput should be an array of objects with the input and output expected
// TODO need to bring in jest to test function properly, as is, array and objects won't work
const evaluateFunc = (strFunc, inputOutput) => {
  const fn = stringToFunc(strFunc);
  return inputOutput.map(obj => {
    console.log("----------", fn(...obj.input), obj.output);
    return fn(...obj.input) === obj.output ? true : false;
  });
}

module.exports = evaluateFunc;