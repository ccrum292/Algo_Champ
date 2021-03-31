const classesController = require('express').Router();

const db = require('../../models');
const { JWTVerifier } = require('../../lib/passport');
const jwt = require('jsonwebtoken');

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


classesController.post('/', JWTVerifier, async (req, res) => {
  try {
    const { name, description, useTrilogyDefault } = req.body;
    const classData = await db.Class.create({ name, description });

    const newClassUserData = await db.ClassUser.create({
      admin: true,
      UserId: req.user.id,
      ClassId: classData.id
    });

    res.json([classData, newClassUserData]);

  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

module.exports = classesController;