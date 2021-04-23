const classesController = require('express').Router();

const db = require('../../models');
const { JWTVerifier } = require('../../lib/passport');
const jwt = require('jsonwebtoken');
const starterProblems = require("../../lib/starterProblems");

classesController.get('/', JWTVerifier, async (req, res) => {
  try {
    const data = await db.User.findByPk(req.user.id);

    const allOfUsersClasses = await data.getClasses();
    
    res.json(allOfUsersClasses);

  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

classesController.get('/:classId', JWTVerifier, async (req, res) => {
  try {
    const classData = await db.Class.findByPk(req.params.classId);

    const students = await classData.getUsers();
    const noPasswordStudentsData = students.map(({id, name, email, ClassUser}) => {
      return {
        id,
        name,
        email,
        score: ClassUser.score,
        algorithmsCompleted: ClassUser.algorithmsCompleted,
        admin: ClassUser.admin,
        owner: ClassUser.owner
      }
    });

    res.json(noPasswordStudentsData);

  } catch (err) {
    console.log(err);
    res.json(err);
  }
});


classesController.delete('/:classId/:studentId', JWTVerifier, async (req, res) => {
  try {
    const classUserData = await db.ClassUser.findOne({
      where: {
        ClassId: req.params.classId,
        UserId: req.user.id,
        admin: 1
      }
    });

    if (!classUserData) return res.sendStatus(401);

    const removeUserFromClass = await db.ClassUser.destroy({
      where: {
        UserId: req.params.studentId,
        ClassId: req.params.classId,
        admin: 0
      }
    })

    res.json(removeUserFromClass);

  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// owner deletes an admin
classesController.delete('/admin/:classId/:studentId', JWTVerifier, async (req, res) => {
  try {
    const classUserData = await db.ClassUser.findOne({
      where: {
        ClassId: req.params.classId,
        UserId: req.user.id,
        admin: 1,
        owner: 1
      }
    });

    if (!classUserData) return res.sendStatus(401);

    const removeUserFromClass = await db.ClassUser.destroy({
      where: {
        UserId: req.params.studentId,
        ClassId: req.params.classId,
      }
    })

    res.json(removeUserFromClass);

  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// create admin
classesController.put('/admin/:classId/:studentId', JWTVerifier, async (req, res) => {
  try {
    console.log("hit")
    const classUserData = await db.ClassUser.findOne({
      where: {
        ClassId: req.params.classId,
        UserId: req.user.id,
        admin: true
      }
    });
    console.log("--------------", classUserData);
    if (!classUserData) return res.sendStatus(401);

    const createAdmin = await db.ClassUser.update({
      admin: true
    }, {
      where: {
        UserId: req.params.studentId,
        ClassId: req.params.classId,
      }
    })

    res.json(createAdmin);

  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// downgrade an admin
classesController.put('/admin/downgrade/:classId/:studentId', JWTVerifier, async (req, res) => {
  try {
    const classUserData = await db.ClassUser.findOne({
      where: {
        ClassId: req.params.classId,
        UserId: req.user.id,
        admin: 1,
        owner: 1
      }
    });

    if (!classUserData) return res.sendStatus(401);

    const createAdmin = await db.ClassUser.update({
      admin: false
    }, {
      where: {
        UserId: req.params.studentId,
        ClassId: req.params.classId,
      }
    })

    res.json(createAdmin);

  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// transfer ownership
classesController.put('/admin/owner/:classId/:studentId', JWTVerifier, async (req, res) => {
  try {
    const classUserData = await db.ClassUser.findOne({
      where: {
        ClassId: req.params.classId,
        UserId: req.user.id,
        admin: 1,
        owner: 1
      }
    });

    if (!classUserData) return res.sendStatus(401);

    let [updateToOwner, downGrade] = await Promise.all([
      db.ClassUser.update({
        admin: true,
        owner: true
      }, {
        where: {
          UserId: req.params.studentId,
          ClassId: req.params.classId,
        }
      }),
      db.ClassUser.update({
        owner: false
      }, {
        where: {
          UserId: req.user.id,
          ClassId: req.params.classId
        }
      })
    ]);


    res.json([updateToOwner, downGrade]);

  } catch (err) {
    console.log(err);
    res.json(err);
  }
});


classesController.post('/', JWTVerifier, async (req, res) => {
  try {
    const { name, description, useTrilogyDefault } = req.body;
    const classData = await db.Class.create({ name, description });

    if (useTrilogyDefault) {
      let [newClassUserData, bulkCreateData] = await Promise.all([
        db.ClassUser.create({
          admin: true,
          owner: true,
          UserId: req.user.id,
          ClassId: classData.id
        }),
        Promise.all(starterProblems.map(async ({ problem, classProblem, example, tests }) => {
          const problemCreationData = await db.Problem.create({
            title: problem.title,
            description: problem.description,
            startingCode: problem.startingCode,
            difficulty: problem.difficulty
          });
    
          const newDisplayExampleArr = example.map(val => {
            return {
              displayValue: val.displayValue,
              ProblemId: problemCreationData.id
            }
          });
          
          const newTestDataArr = tests.map(val => {      
            return { 
              ...val,
              ProblemId: problemCreationData.id
            };
          });
    
          let [classProblemData, exampleCreationData, testsCreationData] = await Promise.all(
            [
              db.ClassProblem.create({
                ...classProblem,
                ClassId: classData.id,
                ProblemId: problemCreationData.id
              }),
              db.Example.bulkCreate(newDisplayExampleArr), 
              db.Test.bulkCreate(newTestDataArr)
            ]);
      
        }))
      ])

      return res.json([classData, newClassUserData, bulkCreateData]);
    }



    const newClassUserData = await db.ClassUser.create({
      admin: true,
      owner: true,
      UserId: req.user.id,
      ClassId: classData.id
    });

    // let bulkCreateData = await Promise.all(starterProblems.map(async ({ problem, classProblem, example, tests }) => {
    //   const problemCreationData = await db.Problem.create({
    //     title: problem.title,
    //     description: problem.description,
    //     startingCode: problem.startingCode,
    //     difficulty: problem.difficulty
    //   });

    //   const newDisplayExampleArr = example.map(val => {
    //     return {
    //       displayValue: val,
    //       ProblemId: classData.id
    //     }
    //   });
      
    //   const newTestDataArr = tests.map(val => {      
    //     return { 
    //       ...val,
    //       ProblemId: classData.id
    //     };
    //   });

    //   let [classProblemData, exampleCreationData, testsCreationData] = await Promise.all(
    //     [
    //       db.ClassProblem.create({
    //         ...classProblem,
    //         ClassId: classId,
    //         ProblemId: classData.id
    //       }),
    //       db.Example.bulkCreate(newDisplayExampleArr), 
    //       db.Test.bulkCreate(newTestDataArr)
    //     ]);
  
    // }));


    res.json([classData, newClassUserData]);

  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

module.exports = classesController;