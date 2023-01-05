const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { constants } = require('http2');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');

const app = express();

const { NODE_ENV, PORT = 3005 } = process.env;

// Выбор среды
const config = dotenv.config({ path: NODE_ENV === 'production' ? '.env' : '.env.common' }).parsed;
app.set('config', config);

app.use(cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Логгер запросов
app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Подключение к БД
mongoose.connect(config.DB_URL);

app.use(router);

app.use(errorLogger);
app.use(helmet());
app.use(limiter);

// Ошибки celebrate
app.use(errors());

// Общий обработчик ошибок
app.use((err, req, res, next) => {
    const status = err.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
    const message = err.message || 'Неизвестная ошибка';
    res.status(status).send({ message });
    next();
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
