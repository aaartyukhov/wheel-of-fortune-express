require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger')

const { DB_ADDRESS } = require('./config');
const routes = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect(DB_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

// краш-тест сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use((req, res, next)=> {
  console.log(req);
  next();
});

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
