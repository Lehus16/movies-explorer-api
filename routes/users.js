const userRouter = require('express').Router();

const { userInfoValidation } = require('../middlewares/celebrateValidation');
const { getCurrentUser, patchUserInfo } = require('../controllers/users');

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', userInfoValidation, patchUserInfo);

module.exports = userRouter;
