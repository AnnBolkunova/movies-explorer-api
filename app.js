require('dotenv').config();
console.log(process.env.NODE_ENV);
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const commonErrorHandler = require('./middlewares/commonErrorHandler');

const app = express();

const { NODE_ENV, DB_URL } = process.env;
const { PORT = 3011 } = process.env;

app.use(cors({
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Логгер запросов
app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Подключение к БД
mongoose.connect(NODE_ENV === 'production' ? DB_URL : 'mongodb://localhost:27017/moviesdb');

app.use(router);

app.use(errorLogger);
app.use(helmet());
app.use(limiter);

// Ошибки celebrate
app.use(errors());

// Общий обработчик ошибок
app.use(commonErrorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
