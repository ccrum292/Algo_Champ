const problemsController = require('express').Router();

const db = require('../../models');
const { JWTVerifier } = require('../../lib/passport');
const jwt = require('jsonwebtoken');

const { format, parseISO } = require("date-fns");
const timeConvert = require("../../lib/timeConvert");
const isJsonStr = require("../../lib/isJsonStr"); 

const starterProblems = require("../../lib/starterProblems");

// Admin Creates a Problem with examples and tests
problemsController.post('/', JWTVerifier, async (req, res) => {
  try {
    const {title, description, startingCode, classId, difficulty, displayExampleArr, testDataArr, classProblemObj} = req.body;
    const classUserData = await db.ClassUser.findOne({
      where: {
        ClassId: classId,
        UserId: req.user.id,
        admin: 1
      }
    });

    if (!classUserData) return res.sendStatus(401);

    const problemCreationData = await db.Problem.create({
      title: title,
      description: description,
      startingCode: startingCode,
      difficulty: difficulty
    });

    const classProblemData = await db.ClassProblem.create({
      ...classProblemObj,
      ClassId: classId,
      ProblemId: problemCreationData.id
    })

    const newDisplayExampleArr = displayExampleArr.map(val => {
      return {
        displayValue: val,
        ProblemId: problemCreationData.id
      }
    });
    
    const newTestDataArr = testDataArr.map(val => {      
      return { 
        ...val,
        ProblemId: problemCreationData.id
      };
    });

    console.log(testDataArr);

    let [exampleCreationData, testsCreationData] = await Promise.all(
      [
        db.Example.bulkCreate(newDisplayExampleArr), 
        db.Test.bulkCreate(newTestDataArr)
      ]);

    res.json([classProblemData, problemCreationData, exampleCreationData, testsCreationData]);
    
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});


problemsController.get('/:classId', JWTVerifier, async (req, res) => {
  try {
    const classData = await db.Class.findByPk(req.params.classId)

    const problemsArr = await classData.getProblems({
      include: [{
        model: db.Test
      }, {
        model: db.Example
      }]
    });

    res.json(problemsArr);

  } catch (err) {
    console.log(err);
    res.status(500);
    res.send(err.message)
  }
});

problemsController.get('/dashboard/:classId', JWTVerifier, async (req, res) => {
  try {
    const classData = await db.Class.findByPk(req.params.classId)

    const problemsArr = await classData.getProblems();

    let answersData = await Promise.all(problemsArr.map(async obj => {
      const data = await obj.getAnswers({
        where: {
          UserId: req.user.id,
          correctAnswer: true
        }
      });

      return data;
    }));

    const filteredAnswersData = answersData.filter(val => val[0]).map(val => val[0].ProblemId);

    const modifiedProblemsArr = problemsArr.filter(obj => filteredAnswersData.indexOf(obj.id) === -1)
      .filter(obj => timeConvert(obj.ClassProblem.airDate).remainderSeconds > 0)
      .map(obj => {

        const timeData = timeConvert(obj.ClassProblem.airDate)
        const airDateFormatted = format(obj.ClassProblem.airDate, "MM-dd-yyyy pp")
        let airDateMod = null
        let airDateModLength = null
        let points = obj.difficulty;
        if(timeData.totalMinutes < obj.ClassProblem.airDateBonusLength) {
          airDateMod = obj.ClassProblem.airDateBonusModifier;
          airDateModLength = obj.ClassProblem.airDateBonusLength - timeData.minutes;
          points = points * airDateMod;
        }

        return {
          id: obj.id,
          airDate: airDateFormatted,
          airDateBonusLength: airDateModLength,
          airDateBonusModifier: airDateMod,
          difficulty: obj.difficulty,
          title: obj.title,
          points: points
        }
      });

    res.json(modifiedProblemsArr);

  } catch (err) {
    console.log(err);
    res.status(500);
    res.send(err.message)
  }
});

problemsController.put('/', JWTVerifier, async (req, res) => {
  try {
    const { title, description, startingCode, classId, problemId, 
      difficulty, displayExampleArr, exampleId, newInputOutputArr, 
      deleteInputOutputArrOfIds, classProblemObj } = req.body;
    
    const classUserData = await db.ClassUser.findOne({
      where: {
        ClassId: classId,
        UserId: req.user.id,
      }
    });
    
    if (!classUserData) return res.sendStatus(401);
    
    const newTestDataArr = newInputOutputArr.map(val => {
      return { ...val, 
        ProblemId: problemId
      }
    });

    const {airDate, airDateBonusModifier, airDateBonusLength} = classProblemObj;

    let [problemUpdateData, classProblemUpdateData, exampleUpdateData, 
      testDeleteData, testCreateData] = await Promise.all([
      db.Problem.update({
        title,
        description,
        startingCode,
        difficulty
      }, {
        where: {
          id: problemId
        }
      }),
      db.ClassProblem.update({
        inUse: 1,
        airDate: airDate,
        airDateBonusModifier: airDateBonusModifier,
        airDateBonusLength: airDateBonusLength
      }, {
        where: {
          ClassId: classId,
          ProblemId: problemId
        }
      }),
      db.Example.update({
        displayValue: displayExampleArr[0]
      }, {
        where: {
          id: exampleId
        }
      }),
      Promise.all(deleteInputOutputArrOfIds.map(async val => {
        const data = await db.Test.destroy({
          where: {
            id: val
          }
        });
  
        return data;
      })),
      db.Test.bulkCreate(newTestDataArr)
    ]);

    res.json([problemUpdateData, classProblemUpdateData, exampleUpdateData, 
      testDeleteData, testCreateData]);

  } catch (err) {
    console.log(err);
    res.status(500);
    res.send(err.message)
  }
});


problemsController.delete('/:classId/:problemId', JWTVerifier, async (req, res) => {
  try {
    const classUserData = await db.ClassUser.findOne({
      where: {
        ClassId: req.params.classId,
        UserId: req.user.id,
        admin: 1
      }
    });

    if (!classUserData) return res.sendStatus(401);

    const classProblemData = await db.ClassProblem.destroy({
      where: {
        ClassId: req.params.classId,
        ProblemId: req.params.problemId
      }
    })

    res.json(classProblemData);
    
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

problemsController.get('/:classId/:problemId', JWTVerifier, async (req, res) => {
  try {
    const classUserData = await db.ClassUser.findOne({
      where: {
        ClassId: req.params.classId,
        UserId: req.user.id,
      }
    });

    if (!classUserData) return res.sendStatus(401);

    const classData = await db.Class.findByPk(req.params.classId)

    const problemsArr = await classData.getProblems({
      where: {
        id: req.params.problemId
      },
      include: [{
        model: db.Example
      }]
    });
    
    res.json(problemsArr);
    
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// bulk create starter problems
// problemsController.post('/bulk', JWTVerifier, async (req, res) => {
//   try {
//     const {title, description, startingCode, classId, difficulty, displayExampleArr, testDataArr, classProblemObj} = req.body;
//     const classUserData = await db.ClassUser.findOne({
//       where: {
//         ClassId: classId,
//         UserId: req.user.id,
//         admin: 1
//       }
//     });

//     if (!classUserData) return res.sendStatus(401);

//     // need class id
//     let bulkCreateData = await Promise.all(starterProblems.map(async ({ problem, classProblem, example, tests }) => {
//       const problemCreationData = await db.Problem.create({
//         title: problem.title,
//         description: problem.description,
//         startingCode: problem.startingCode,
//         difficulty: problem.difficulty
//       });

//       const newDisplayExampleArr = example.map(val => {
//         return {
//           displayValue: val,
//           ProblemId: problemCreationData.id
//         }
//       });
      
//       const newTestDataArr = tests.map(val => {      
//         return { 
//           ...val,
//           ProblemId: problemCreationData.id
//         };
//       });

//       let [classProblemData, exampleCreationData, testsCreationData] = await Promise.all(
//         [
//           db.ClassProblem.create({
//             ...classProblem,
//             ClassId: classId,
//             ProblemId: problemCreationData.id
//           }),
//           db.Example.bulkCreate(newDisplayExampleArr), 
//           db.Test.bulkCreate(newTestDataArr)
//         ]);
  
//     }));





//     console.log(bulkCreateData);


//     res.json([classProblemData, problemCreationData, exampleCreationData, testsCreationData]);
    
//   } catch (err) {
//     console.log(err);
//     res.json(err);
//   }
// });
module.exports = problemsController;