const { Router } = require('express');

const userRouter = require('./users');
const movieRouter = require('./movies');
const { validationUserCreate, validationLogin } = require('../utils/validator');
const { login, createUser } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

const authRouter = new Router();
const router = new Router();

authRouter.post('/signup', validationUserCreate, createUser);

authRouter.post('/signin', validationLogin, login);

router.use('/', authRouter);
router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.all('/*', (req, res, next) => {
    next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
