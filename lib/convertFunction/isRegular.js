module.exports = str => {
  let argumentStr = "";
  let pushToArgumentStr = false;
  let codeBodyStr = "";
  let pushToCodeBodyStr = false;

  const splitFull = str.split("");
  const indexOfCodeBlock = splitFull.indexOf("{");
  const spliceRes = splitFull.splice(0, indexOfCodeBlock);
  
  spliceRes.forEach(val => {
    if (val === ")") pushToArgumentStr = false;
    if (pushToArgumentStr) argumentStr += val;
    if (val === "(") pushToArgumentStr = true;
  })


  splitFull.forEach(val => {
    if (val === "}") pushToCodeBodyStr = false;
    if (pushToCodeBodyStr) codeBodyStr += val;
    if (val === "{") pushToCodeBodyStr = true;
  })

  return {
    isRegular: true,
    codeBody: codeBodyStr,
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