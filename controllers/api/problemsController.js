const problemsController = require('express').Router();

const db = require('../../models');
const { JWTVerifier } = require('../../lib/passport');
const jwt = require('jsonwebtoken');


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
      return { ...val, 
        ProblemId: problemCreationData.id
      }
    });

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
    const classUserData = await db.ClassUser.findOne({
      where: {
        ClassId: req.params.classId,
        UserId: req.user.id,
      }
    });

    if (!classUserData) return res.sendStatus(401);

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

problemsController.put('/', JWTVerifier, async (req, res) => {
  try {
    const {title, description, startingCode, classId, problemId, difficulty, displayExampleArr, exampleId, newInputOutputArr, deleteInputOutputArrOfIds, classProblemObj} = req.body;
    
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

    let [problemUpdateData, classProblemUpdateData, exampleUpdateData, testDeleteData, testCreateData] = await Promise.all([
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
        classProblemObj
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
    ])

    res.json([problemUpdateData, classProblemUpdateData, exampleUpdateData, testDeleteData, testCreateData]);

  } catch (err) {
    console.log(err);
    res.status(500);
    res.send(err.message)
  }
});



// Admin accepts joinRequest and deletes
// problemsController.post('/accept/:classId', JWTVerifier, async (req, res) => {
//   try {
//     const classUserData = await db.ClassUser.findOne({
//       where: {
//         ClassId: req.params.classId,
//         UserId: req.user.id,
//         admin: 1
//       }
//     });

//     if (!classUserData) return res.sendStatus(401);

//     const data = await db.ClassUser.create({
//       ClassId: req.params.classId,
//       UserId: req.body.studentUserId,
//     })

//     const deleteRequest = await db.joinRequest.destroy({
//       where: {
//         id: req.body.joinRequestId
//       }
//     })

//     res.json(data);

//   } catch (err) {
//     console.log(err);
//     res.json(err);
//   }
// });

// Admin Declines joinRequest and deletes
// problemsController.post('/decline/:classId', JWTVerifier, async (req, res) => {
//   try {
//     const classUserData = await db.ClassUser.findOne({
//       where: {
//         ClassId: req.params.classId,
//         UserId: req.user.id,
//         admin: 1
//       }
//     });
//     console.log(classUserData);
//     if (!classUserData) return res.sendStatus(401);

//     const deleteRequest = await db.joinRequest.destroy({
//       where: {
//         id: req.body.joinRequestId
//       }
//     })

//     res.json(deleteRequest);

//   } catch (err) {
//     console.log(err);
//     res.json(err);
//   }
// });

module.exports = problemsController;