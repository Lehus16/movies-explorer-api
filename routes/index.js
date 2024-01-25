const router = require('express').Router();

const authRouter = require('./auth');
const userRouter = require('./users');
const moviesRouter = require('./movies');

const auth = require('../middlewares/auth');

const { signOut } = require('../controllers/users');

router.use('/', authRouter);

// защищаем роуты авторизацией
router.use('/users', auth, userRouter);
router.use('/movies', auth, moviesRouter);
router.get('/signout', auth, signOut);

module.exports = router;
