module.exports = str => {
  const splitByWord = str.split(" ");
  
  const indexOfWordFunction = splitByWord.indexOf("function")

  if (indexOfWordFunction !== -1) {
    let argumentStr = "";
    let pushToArgumentStr = false;

    const splitFull = str.split("");
    const indexOfCodeBlock = splitFull.indexOf("{");
    const spliceRes = splitFull.splice(0, indexOfCodeBlock);

    spliceRes.forEach(val => {
      if (val === ")") pushToArgumentStr = false;
      if (pushToArgumentStr) argumentStr += val;
      if (val === "(") pushToArgumentStr = true;
    })

    return {
      isRegular: true,
      codeBody: splitFull.join("").slice(1, -1),
      codeArgs: argumentStr
    }
  }
  
  return { 
    isRegular: false,
    codeBody: undefined,
    codeArgs: undefined
  }
};