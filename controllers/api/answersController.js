const answersController = require('express').Router();

const db = require('../../models');
const { JWTVerifier } = require('../../lib/passport');
const jwt = require('jsonwebtoken');

const uneval = require('uneval');
const evaluateFunc = require("../../lib/convertFunction");

answersController.post('/', async (req, res) => {
  try {
    const { codeText, UserId, ProblemId } = req.body;
    const data = await db.Answer.create({ codeText, UserId, ProblemId });

    const problemData = await db.Problem.findByPk(ProblemId);

    const testsData = await problemData.getTests();

    const inputOutput = testsData.map(test => {
      return {
        input: [test.input],
        output: test.output
      }
    })
    
    const eval = evaluateFunc(codeText, inputOutput);

    res.json(eval);

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
