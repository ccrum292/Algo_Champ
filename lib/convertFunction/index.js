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
  // console.log(uneval(fn));
  return inputOutput.map(obj => fn(...obj.input) === obj.output ? { ...obj, eval: true} : { ...obj, eval: false});
}


// const testInputOutput = [
//   {
//     input: [1,2],
//     output: 3
//   },
//   {
//     input: [1,2],
//     output: 4
//     },
//   {
//     input: [8,2],
//     output: 10
//   }
// ];  

// const testStrFunc = `function sum (a, b) {
//   return a + b;
// }`

// evaluateFunc(testStrFunc, testInputOutput);

module.exports = evaluateFunc;