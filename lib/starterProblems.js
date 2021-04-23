module.exports = [
  {
    problem: {
      title: "To Uppercase",
      description: "Write a function that takes in a string and outputs said string in all uppercase letters.",
      startingCode: "const toUpperCase = str =>",
      difficulty: 1
    },
    classProblem: {
      airDate: new Date(),
      airDateBonusModifier: 2,
      airDateBonusLength: 45,
    },
    example: [{
      displayValue: 'toUpperCase("hello") --> "HELLO"',
    }],
    tests: [{
      input: '["hello"]',
      output: '"HELLO"'
    }]
  },
  {
    problem: {
      title: "Combine Arrays",
      description: "Write a function that take in two arrays and returns one array with the contents of both the input arrays.",
      startingCode: "const combineArr = (arr1, arr2) => ",
      difficulty: 1
    },
    classProblem: {
      airDate: new Date(),
      airDateBonusModifier: 2,
      airDateBonusLength: 45,
    },
    example: [{
      displayValue: 'combineArr(["Lion", "Tiger"], ["Brown Bear", "Panda"]) --> ["Lion", "Tiger", "Brown Bear", "Panda"]',
    }],
    tests: [{
      input: '[["Lion", "Tiger"], ["Brown Bear", "Panda"]]',
      output: '["Lion", "Tiger", "Brown Bear", "Panda"]'
    }]
  },
]