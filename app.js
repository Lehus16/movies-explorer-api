require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('./middlewares/corsHandler');
const rateLimiter = require('./middlewares/rateLimiter');
const NotFoundError = require('./errors/notFound');

const { PORT = 3000, MONGO_URL, NODE_ENV } = process.env;

const app = express();

// Rate Limiter
app.use(rateLimiter);

// Заголовки helmet
app.use(helmet());

// CORS
app.use(cors);

app.use(express.json());
app.use(cookieParser());

// Логгер запросов
app.use(requestLogger);

// Root route
app.use(router);
app.use('*', (req, res, next) => next(new NotFoundError('Страница не найдена.')));
// Логгер ошибок
app.use(errorLogger);

// Обработчики ошибок
app.use(errors());
app.use(errorHandler);

async function init() {
  await mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/bitfilmsdb');
  app.listen(PORT);
}

init();
