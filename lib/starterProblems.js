// please leave starter code looking odd, it has the correct format 

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
  {
    problem: {
      title: "Max Number",
      description: "Write a function that takes in two numbers and outputs the max (the greater of the two numbers).",
      startingCode:`var max = function(num1, num2){
    
}`,
      difficulty: 1
    },
    classProblem: {
      airDate: new Date(),
      airDateBonusModifier: 2,
      airDateBonusLength: 45,
    },
    example: [{
      displayValue: `Ex: 
      Input: 1, 2
      Output: 2
    
      Input: 6, -4
      Output: 6
    
      Input: 3.4, 2
      Output: 3.4`,
    }],
    tests: [{
      input: '[1,2]',
      output: '2'
    },
    {
      input: '[6, -4]',
      output: '6'
    },
    {
      input: '[3.4, 2]',
      output: '3.4'
    }]
  },
  {
    problem: {
      title: "totalSum",
      description: "Write a function that takes in an integer and outputs the sum of all the numbers from 1 to that integer.",
      startingCode: `function totalSum(num){

}`,
      difficulty: 1
    },
    classProblem: {
      airDate: new Date(),
      airDateBonusModifier: 2,
      airDateBonusLength: 45,
    },
    example: [{
      displayValue: `Ex:
      Input: 2
      Output: 3 (because 1 + 2 = 3), 
    
      Input: 4
      Output: 10  (because 1 + 2 + 3 + 4 = 10), 
    
      Input: 10
      Output: 55`,
    }],
    tests: [{
      input: '[2]',
      output: '3'
    },
    {
      input: '[4]',
      output: '10'
    },
    {
      input: '[10]',
      output: '55'
    }]
  },
  {
    problem: {
      title: "findMax",
      description: "Write a function that takes in an array of numbers and outputs the maximum number.",
      startingCode: `function findMax(numArr) {

}`,
      difficulty: 1
    },
    classProblem: {
      airDate: new Date(),
      airDateBonusModifier: 2,
      airDateBonusLength: 45,
    },
    example: [{
      displayValue: `Ex:
      Input: [ 1, 2, 3 ]
      Output: 3, 
    
      Input: [ 3, 6, 4, 5, 2, 1 ]
      Output: 6, 
    
      Input: [ 3, 3, 3 ]
      Output: 3`,
    }],
    tests: [{
      input: '[[ 1, 2, 3 ]]',
      output: '3'
    },
    {
      input: '[[ 3, 6, 4, 5, 2, 1 ]]',
      output: '6'
    },
    {
      input: '[[ 3, 3, 3 ]]',
      output: '3'
    }]
  },
  {
    problem: {
      title: "Count Vowels",
      description: "Write a function that takes in a string and outputs the number of vowels (not counting y)",
      startingCode: `function countVowels(str) {

}`,
      difficulty: 2
    },
    classProblem: {
      airDate: new Date(),
      airDateBonusModifier: 2,
      airDateBonusLength: 45,
    },
    example: [{
      displayValue: `Ex:
      Input: "hello"
      Output: 2, 
    
      Input: "you are great!"
      Output: 6, 
    
      Input: "why?"
      Output: 0`,
    }],
    tests: [{
      input: '["hello"]',
      output: '2'
    },
    {
      input: '["you are great!"]',
      output: '6'
    },
    {
      input: '["why?"]',
      output: '0'
    }]
  },
  {
    problem: {
      title: "Palindrome",
      description: "Write a function that takes in a single word as a string and returns true if it’s a palindrome and false otherwise (a palindrome is spelled the same way forwards and backwards).",
      startingCode: `function isPalindrome(str) {

}`,
      difficulty: 2
    },
    classProblem: {
      airDate: new Date(),
      airDateBonusModifier: 2,
      airDateBonusLength: 45,
    },
    example: [{
      displayValue: `Ex:
      Input: "noon"
      Output: true, 
    
      Input: "horse"
      Output: false, 
    
      Input: "racecar"
      Output: true
    `,
    }],
    tests: [{
      input: '["noon"]',
      output: 'true'
    },
    {
      input: '["horse"]',
      output: 'false'
    },
    {
      input: '["racecar"]',
      output: 'true'
    }]
  },
  {
    problem: {
      title: "First Non-Repeat Character",
      description: "Write a function that takes in a string and outputs the first occurrence of a character that does not repeat itself in that string.",
      startingCode: `function firstNonRepeatChar(str) {

}`,
      difficulty: 2
    },
    classProblem: {
      airDate: new Date(),
      airDateBonusModifier: 2,
      airDateBonusLength: 45,
    },
    example: [{
      displayValue: `Ex:
      Input: “the quick brown fox jumps over the calm kitten quietly”
      Output: "b", 
    
      Input: “this hat is the greatest!”
      Output: "g", 
    
      Input: “what a wonderful day it has been!”
      Output: "o"`,
    }],
    tests: [{
      input: '[“the quick brown fox jumps over the calm kitten quietly”]',
      output: '"b"'
    },
    {
      input: '[“this hat is the greatest!”]',
      output: '"g"'
    },
    {
      input: '[“what a wonderful day it has been!”]',
      output: '"o"'
    }]
  },
  {
    problem: {
      title: "Average",
      description: "Write a function that takes in an array of numbers and outputs the average of all the numbers.",
      startingCode: `function average(numArr) {

}`,
      difficulty: 2
    },
    classProblem: {
      airDate: new Date(),
      airDateBonusModifier: 2,
      airDateBonusLength: 45,
    },
    example: [{
      displayValue: `Ex:
      Input: [ 1 , 4 , 7 ]
      Output: 4, 
      
      Input: [ 10, 5 ]
      Output: 7.5, 
      
      Input: [ 1.5, 3, 2.5, 1 ]
      Output: 2, 
      `,
    }],
    tests: [{
      input: '[[ 1 , 4 , 7 ]]',
      output: '4'
    },
    {
      input: '[[ 10, 5 ]]',
      output: '7.5'
    },
    {
      input: '[[ 1.5, 3, 2.5, 1 ]]',
      output: '2'
    }]
  },
  {
    problem: {
      title: "Is Integer",
      description: "Write a function that takes in an input and returns true if it’s an integer and false otherwise.",
      startingCode: `function isInt(val) {

}`,
      difficulty: 1
    },
    classProblem: {
      airDate: new Date(),
      airDateBonusModifier: 2,
      airDateBonusLength: 45,
    },
    example: [{
      displayValue: `Ex:
      Input: "7"
      Output: false, 
      
      Input: 7
      Output: true, 
      
      Input: 4.3
      Output: false`,
    }],
    tests: [{
      input: '["7"]',
      output: 'false'
    },
    {
      input: '[7]',
      output: 'true'
    },
    {
      input: '[4.3]',
      output: 'false'
    }]
  },
  {
    problem: {
      title: "Find Duplicate",
      description: "Write a function that takes an array of integers as an input and outputs the first duplicate.",
      startingCode: `function findDup(arr) {

}`,
      difficulty: 3
    },
    classProblem: {
      airDate: new Date(),
      airDateBonusModifier: 2,
      airDateBonusLength: 45,
    },
    example: [{
      displayValue: `Ex:
      Input: [ 2, 5, 6, 3, 5 ]
      Output: 5, 
      
      Input: [ 1, 3, 4, 1, 3, 4 ]
      Output: 1, 
      
      Input: [ 2, 4, 5 ]
      Output: undefined
      `,
    }],
    tests: [{
      input: '[[ 2, 5, 6, 3, 5 ]]',
      output: '5'
    },
    {
      input: '[[ 1, 3, 4, 1, 3, 4 ]]',
      output: '1'
    },
    {
      input: '[[ 2, 4, 5 ]]',
      output: 'undefined'
    }]
  },
  {
    problem: {
      title: "Pangram",
      description: "Write a function that takes in a string and returns true if it’s a pangram or false otherwise. Pangram: a sentence that contains every letter in the alphabet.",
      startingCode: `function pangram(str) {

}`,
      difficulty: 2
    },
    classProblem: {
      airDate: new Date(),
      airDateBonusModifier: 2,
      airDateBonusLength: 45,
    },
    example: [{
      displayValue: `Ex:
      Input: “Watch Jeopardy, Alex Trebek’s fun TV quiz game”
      Output: true, 
      
      Input: “Five hexing wizard bots jump quickly”
      Output: true, 
      
      Input: “JavaScript is the best”
      Output: false
      `,
    }],
    tests: [{
      input: '[“Watch Jeopardy, Alex Trebek’s fun TV quiz game”]',
      output: 'true'
    },
    {
      input: '[“Five hexing wizard bots jump quickly”]',
      output: 'true'
    },
    {
      input: '[“JavaScript is the best”]',
      output: 'false'
    }]
  },
  {
    problem: {
      title: "Get Day",
      description: "Write a function that takes in a number and returns the corresponding day of the week.",
      startingCode: `function getDay(dayNum) {

}`,
      difficulty: 2
    },
    classProblem: {
      airDate: new Date(),
      airDateBonusModifier: 2,
      airDateBonusLength: 45,
    },
    example: [{
      displayValue: `Ex:
      Input: 1
      Output: 'Monday', 
    
      Input: 5
      Output: 'Friday', 
    
      Input: 8
      Output: undefined`,
    }],
    tests: [{
      input: '[1]',
      output: '"Monday"'
    },
    {
      input: '[5]',
      output: '"Friday"'
    },
    {
      input: '[8]',
      output: 'undefined'
    }]
  },
  // {
  //   problem: {
  //     title: "",
  //     description: "",
  //     startingCode: ``,
  //     difficulty: 2
  //   },
  //   classProblem: {
  //     airDate: new Date(),
  //     airDateBonusModifier: 2,
  //     airDateBonusLength: 45,
  //   },
  //   example: [{
  //     displayValue: ``,
  //   }],
  //   tests: [{
  //     input: '[]',
  //     output: ''
  //   },
  //   {
  //     input: '[]',
  //     output: ''
  //   },
  //   {
  //     input: '[]',
  //     output: ''
  //   }]
  // },
  // {
  //   problem: {
  //     title: "",
  //     description: "",
  //     startingCode: ``,
  //     difficulty: 2
  //   },
  //   classProblem: {
  //     airDate: new Date(),
  //     airDateBonusModifier: 2,
  //     airDateBonusLength: 45,
  //   },
  //   example: [{
  //     displayValue: ``,
  //   }],
  //   tests: [{
  //     input: '[]',
  //     output: ''
  //   },
  //   {
  //     input: '[]',
  //     output: ''
  //   },
  //   {
  //     input: '[]',
  //     output: ''
  //   }]
  // },
]