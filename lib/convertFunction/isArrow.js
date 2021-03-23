module.exports = str => {
  const fullSplit = str.split("");

  let lastVal;
  
  for (const [i, val] of fullSplit.entries()) {
    if(lastVal === "=" && val === ">") {
      let isImplicit = false;
      let codeForNewFunc;
      let argumentStr = "";
      let pushToArgumentStr = false;
      let filterSwitch = false;

      const spliceRes = fullSplit.splice(0, i + 1);

      const contentBwtEqualAndEqual = spliceRes.filter(val => {
        if (val === "=") filterSwitch = !filterSwitch;
        return filterSwitch;
      }).slice(1).join("").trim();

      if (contentBwtEqualAndEqual.indexOf("(") === -1){
        argumentStr = contentBwtEqualAndEqual;
      } else {
        spliceRes.forEach(val => {
          if (val === ")") pushToArgumentStr = false;
          if (pushToArgumentStr) argumentStr += val;
          if (val === "(") pushToArgumentStr = true;
        })
      }

      console.log(argumentStr);

      const newFullSplit = fullSplit.join("").trim().split("");

      if (newFullSplit[0] !== "{") {
        isImplicit = true
        codeForNewFunc = fullSplit.join("").trim();
      } else {
        codeForNewFunc = fullSplit.join("").trim().slice(1,-1);
      }

      return {
        isArrow: true,
        isImplicit: isImplicit,
        codeBody: codeForNewFunc,
        codeArgs: argumentStr
      };

    } else {
      lastVal = val;
    }
  }

  return {
    isArrow: false,
    isImplicit: false,
    codeBody: undefined
  }

}