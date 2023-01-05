const userRouter = require('express').Router();
const { currentUser, updateProfileInfo } = require('../controllers/users');
const { validationProfileUpdate } = require('../utils/validator');

userRouter.get('/me', currentUser);

userRouter.patch('/me', validationProfileUpdate, updateProfileInfo);

module.exports = userRouter;
