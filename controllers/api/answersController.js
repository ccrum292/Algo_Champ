const answersController = require('express').Router();

const db = require('../../models');
const { JWTVerifier } = require('../../lib/passport');

// const uneval = require('uneval');
const isJsonStr = require("../../lib/isJsonStr");
const evaluateFunc = require("../../lib/convertFunction");

answersController.post('/', JWTVerifier, async (req, res) => {
  try {
    const { codeText, UserId, ProblemId } = req.body;
    
    const problemData = await db.Problem.findByPk(ProblemId);
    
    const testsData = await problemData.getTests();
    
    const inputOutput = testsData.map(test => {
      return {
        input: JSON.parse(test.input),
        output: isJsonStr(test.output) ? JSON.parse(test.output) : test.output
      };
    });
    
    const eval = evaluateFunc(codeText, inputOutput);
    const evalFilter = eval.filter(val => !val)
    const correctAnswer = evalFilter[0] === false ? false : true;

    const data = await db.Answer.create({ codeText, correctAnswer, UserId, ProblemId });
    
    res.json([data, inputOutput]);
    
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

module.exports = answersController;
