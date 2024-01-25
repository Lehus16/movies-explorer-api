const authRouter = require('express').Router();

const { signinValidation, signupValidation } = require('../middlewares/celebrateValidation');
const { signIn, signUp } = require('../controllers/users');

authRouter.post('/signin', signinValidation, signIn);
authRouter.post('/signup', signupValidation, signUp);

module.exports = authRouter;
