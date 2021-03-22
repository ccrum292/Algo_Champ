const problemsController = require('express').Router();

const db = require('../../models');
const { JWTVerifier } = require('../../lib/passport');
const jwt = require('jsonwebtoken');


// Admin Creates a Problem with examples and tests
problemsController.post('/', JWTVerifier, async (req, res) => {
  try {
    const {title, description, startingCode, classId, displayValueArr, testDataArr, classProblemObj} = req.body;
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

    });

    const classProblemData = await db.ClassProblem.create({
      ...classProblemObj,
      ClassId: classId,
      ProblemId: problemCreationData.id
    })

    const newDisplayValueArr = displayValueArr.map(val => {
      return {
        displayValue: val,
        ProblemId: problemCreationData.id
      }
    });

    const exampleCreationData = await db.Example.bulkCreate(newDisplayValueArr);

    const newTestDataArr = testDataArr.map(val => {
      return { ...val, 
        ProblemId: problemCreationData.id
      }
    });

    const testsCreationData = await db.Test.bulkCreate(newTestDataArr)


    res.json([classProblemData, problemCreationData, exampleCreationData, testsCreationData]);
    
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});


// Admin gets joinRequests
// problemsController.get('/:classId', JWTVerifier, async (req, res) => {
//   try {
//     const classUserData = await db.ClassUser.findOne({
//       where: {
//         ClassId: req.params.classId,
//         UserId: req.user.id,
//         admin: 1
//       }
//     });

//     if (!classUserData) return res.sendStatus(401);

//     const joinRequests = await db.joinRequest.findAll({
//       where: {
//         ClassId: req.params.classId,
//         pending: 1
//       }
//     })

//     res.json(joinRequests);

//   } catch (err) {
//     console.log(err);
//     res.json(err);
//   }
// });

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