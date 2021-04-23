const answersController = require('express').Router();

const db = require('../../models');
const { JWTVerifier } = require('../../lib/passport');
const timeConvert = require("../../lib/timeConvert");

// const uneval = require('uneval');
const isJsonStr = require("../../lib/isJsonStr");
const evaluateFunc = require("../../lib/convertFunction");

answersController.post('/', JWTVerifier, async (req, res) => {
  try {
    const { codeText, UserId, ProblemId, classId } = req.body;

    const classUserData = await db.ClassUser.findOne({
      where: {
        ClassId: classId,
        UserId: req.user.id,
      }
    });
    if (!classUserData) return res.sendStatus(401);

    const problemData = await db.Problem.findByPk(ProblemId);

    const previousAnswers = await problemData.getAnswers({
      where: {
        UserId: UserId,
        correctAnswer: true
      }
    });

    if (previousAnswers[0]) return res.send("You have already Completed this Algorithm.")

    const testsData = await problemData.getTests();

    const inputOutput = testsData.map(test => {
      return {
        input: JSON.parse(test.input),
        output: isJsonStr(test.output) ? JSON.parse(test.output) : test.output
      };
    });

    const eval = evaluateFunc(codeText, inputOutput);
    console.log(eval);
    const evalFilter = eval.filter(val => !val)
    const correctAnswer = evalFilter[0] === false ? false : true;

    
    if (!correctAnswer) {
      const data = await db.Answer.create({ codeText, correctAnswer, UserId, ProblemId, points: 0 });
      return res.json(data);
    } 

    const classProblem = await db.ClassProblem.findOne({
      where: {
        ClassId: classId,
        ProblemId: ProblemId
      }
    })

    const convert = timeConvert(classProblem.airDate);

    const score = () => {
      if (convert.minutes < classProblem.airDateBonusLength && convert.minutes > 0) {
        return {
          total: classProblem.airDateBonusModifier * problemData.difficulty + classUserData.score,
          single: classProblem.airDateBonusModifier * problemData.difficulty
        };
      }

      return {
        total: problemData.difficulty + classUserData.score,
        single: problemData.difficulty
      };
    };

    const newScore = score();

    let [updateData, newAnswer] = await Promise.all(
      [
        db.ClassUser.update({
          score: newScore.total,
          algorithmsCompleted: classUserData.algorithmsCompleted + 1
        }, {
          where: {
            ClassId: classId,
            UserId: req.user.id
          }
        }),
        db.Answer.create({ codeText, correctAnswer, UserId, ProblemId, points: newScore.single })
      ]
    )

    res.json({
      correctAnswer: correctAnswer,
      newScore: newScore.total
    });

  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

answersController.get('/:problemId', JWTVerifier, async (req, res) => {
  try {
    const answerData = await db.Answer.findAll({
      where: {
        correctAnswer: true,
        ProblemId: req.params.problemId
      },
      include: [{
        model: db.User,
        attributes: ["id", "name", "email"]
      }],
      limit: 10
    })

    res.json(answerData);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

answersController.get('/all/:classId', JWTVerifier, async (req, res) => {
  try {
    const data = await db.ClassProblem.findAll({
      where: {
        ClassId: req.params.classId
      },
      include: [{
        model: db.Problem,
        include: [{
          model: db.Answer,
          where: {
            correctAnswer: true,
            UserId: req.user.id
          }
        }]
      }]
    });
    
    const filtered = data.filter(obj => obj.Problem && obj.Problem.Answers)

    res.json(filtered);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

module.exports = answersController;
