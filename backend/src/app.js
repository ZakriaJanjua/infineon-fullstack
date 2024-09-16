const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const superhero = require('./routes/superhero');
const auth = require('./routes/auth');
const user = require('./routes/user');
const team = require('./routes/team');

const { errorMiddleware } = require('./middlewares/errorMiddleware');
const { authMiddleware } = require('./middlewares/authMiddleware');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', async (req, res, next) => {
	res.json({ message: 'working 🦄🌈✨👋🌎🌍🌏✨🌈🦄' });
});

app.use('/auth', auth);

app.use(authMiddleware.checkTokenSetUser);

app.use('/superhero', authMiddleware.isLoggedIn, superhero);
app.use('/user', authMiddleware.isLoggedIn, user);
app.use('/team', authMiddleware.isLoggedIn, team);

app.use(errorMiddleware.errorHandler);
app.use('*', (req, res, next) =>
	res.status(404).json({ message: 'invalid route', status: false })
);

exports.app = app;
