module.exports = str => {
  let argumentStr = "";
  let pushToArgumentStr = false;
  let pushToCodeBodyStr = false;
  
  const splitFull = str.trim().split("");
  const indexOfCodeBlock = splitFull.indexOf("{");
  const spliceRes = splitFull.splice(0, indexOfCodeBlock);
  
  spliceRes.forEach(val => {
    if (val === ")") pushToArgumentStr = false;
    if (pushToArgumentStr) argumentStr += val;
    if (val === "(") pushToArgumentStr = true;
  })

  splitFull.shift();
  splitFull.pop();

  return {
    isRegular: true,
    codeBody: splitFull.join(""),
    codeArgs: argumentStr
  }
  
  // const splitByWord = str.split(" ");
  
  // const indexOfWordFunction = splitByWord.indexOf("function")
  // if (indexOfWordFunction !== -1) {
  // }
  
  // return { 
  //   isRegular: false,
  //   codeBody: undefined,
  //   codeArgs: undefined
  // }
};