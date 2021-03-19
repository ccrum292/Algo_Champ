const answersController = require('express').Router();

const db = require('../../models');
const { JWTVerifier } = require('../../lib/passport');
const jwt = require('jsonwebtoken');

answersController.post('/', async (req, res) => {
  try {
    const { codeText, UserId, ProblemId } = req.body;
    const data = await db.Answer.create({ codeText, UserId, ProblemId });
    res.json(data);

  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

// answersController.get('/me', JWTVerifier, (req, res) => {
// 	res.json(req.user);
// });

// answersController.post('/login', (req, res) => {
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

module.exports = answersController;
