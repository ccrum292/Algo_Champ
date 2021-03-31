const joinRequestController = require('express').Router();

const db = require('../../models');
const { JWTVerifier } = require('../../lib/passport');
const jwt = require('jsonwebtoken');

// Admin gets joinRequests
joinRequestController.get('/:classId', JWTVerifier, async (req, res) => {
  try {
    const classUserData = await db.ClassUser.findOne({
      where: {
        ClassId: req.params.classId,
        UserId: req.user.id,
        admin: 1
      }
    });

    if (!classUserData) return res.sendStatus(401);

    const joinRequests = await db.joinRequest.findAll({
      where: {
        ClassId: req.params.classId,
        pending: 1
      }
    })

    res.json(joinRequests);

  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// Student sends joinRequest
joinRequestController.post('/', JWTVerifier, async (req, res) => {
  try {
    const classData = await db.Class.findOne({
      where: {
        name: req.body.name
      }
    });

    if (!classData) return res.sendStatus(404);
    const joinRequest = await db.joinRequest.create({
      ClassId: classData.id,
      UserId: req.user.id,
      userEmail: req.user.email
    })

    res.json(joinRequest);

  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// Admin accepts joinRequest and deletes
joinRequestController.post('/accept/:classId', JWTVerifier, async (req, res) => {
  try {
    const classUserData = await db.ClassUser.findOne({
      where: {
        ClassId: req.params.classId,
        UserId: req.user.id,
        admin: 1
      }
    });

    if (!classUserData) return res.sendStatus(401);

    const data = await db.ClassUser.create({
      ClassId: req.params.classId,
      UserId: req.body.studentUserId,
    })

    const deleteRequest = await db.joinRequest.destroy({
      where: {
        id: req.body.joinRequestId
      }
    })

    res.json(data);

  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// Admin Declines joinRequest and deletes
joinRequestController.post('/decline/:classId', JWTVerifier, async (req, res) => {
  try {
    const classUserData = await db.ClassUser.findOne({
      where: {
        ClassId: req.params.classId,
        UserId: req.user.id,
        admin: 1
      }
    });

    if (!classUserData) return res.sendStatus(401);

    const deleteRequest = await db.joinRequest.destroy({
      where: {
        id: req.body.joinRequestId
      }
    })

    res.json(deleteRequest);

  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

module.exports = joinRequestController;