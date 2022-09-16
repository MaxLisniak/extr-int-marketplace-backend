import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandler from './middleware/errorHandler';
import rootRouter from './routes/root';
dotenv.config(); // TODO: заюзай пакет dotenv-cli

const app = express();

const corsConfig = {
  origin: "http://localhost:3001",
  credentials: true
};
app.use(cors(corsConfig));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));
app.use('/', rootRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// handle errors
app.use(errorHandler);

export default app;
