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

// classesController.get('/me', JWTVerifier, (req, res) => {
// 	res.json(req.user);
// });

// classesController.post('/login', (req, res) => {
// 	const { email, password } = req.body;

// 	db.User.findOne({ where: { email } }).then((user) => {
// 		if (!user) return res.status(404).send('User not Found');
// 		if (user.dataValues.password !== password) return res.status(401).send('Unauthorized');

// 		res.json({
// 			token: jwt.sign({ sub: user.id }, process.env.JWT_SECRET),
// 			user
// 		});
// 	});
// });

module.exports = classesController;