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

const isEqual = (value, other) => {
  // Get the value type
	var type = Object.prototype.toString.call(value);
  
	// If the two objects are not the same type, return false
	if (type !== Object.prototype.toString.call(other)) return false;
  
	// If items are not an object or array, check if value and other are equal and return true or false  
	if (['[object Array]', '[object Object]'].indexOf(type) < 0) return value === other;
  
	// Compare the length of the length of the two items
	var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
	var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
	if (valueLen !== otherLen) return false;
  
	// Compare two items
	const compare = (item1, item2) => {
    
    // Get the object type
		var itemType = Object.prototype.toString.call(item1);
    
		// If an object or array, compare recursively
		if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
      if (!isEqual(item1, item2)) return false;
		}
    
		// Otherwise, do a simple comparison
		else {
      
      // If the two items are not the same type, return false
			if (itemType !== Object.prototype.toString.call(item2)) return false;
      
			// Else if it's a function, convert to a string and compare
			// Otherwise, just compare
			if (itemType === '[object Function]') {
        if (item1.toString() !== item2.toString()) return false;
			} else {
        if (item1 !== item2) return false;
			}
      
		}
	};
  
	// Compare properties
	if (type === '[object Array]') {
    for (var i = 0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) {
        return false;
      };
		}
	} else {
    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        if (compare(value[key], other[key]) === false) return false;
			}
		}
	}
  
	// If nothing failed, return true
	return true;
}


// inputOutput should be an array of objects with the input and output expected
// ! having trouble with undefined
const evaluateFunc = (strFunc, inputOutput) => {
  const fn = stringToFunc(strFunc);
  console.log("----------------------")
  console.log(inputOutput)
  const inputOutputAlteredForUndefined = inputOutput.map(val => {

  });
  console.log(inputOutputAlteredForUndefined);
  return inputOutput.map(obj => {
    return isEqual(fn(...obj.input), obj.output);
  });
}

module.exports = evaluateFunc;