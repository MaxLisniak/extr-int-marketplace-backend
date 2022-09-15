import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import type { NextFunction, RequestHandler, Request, Response } from "express";
import dotenv from 'dotenv';
dotenv.config(); // TODO: заюзай пакет dotenv-cli

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import categoriesRouter from './routes/categories';
import subcategoriesRouter from './routes/subcategories';
import productsRouter from './routes/products';
import commentsRouter from './routes/comments';
import pricesRouter from './routes/prices';
import favoritesRouter from './routes/favorites';
import keywordsRouter from './routes/keywords';
import characteristicNamesRouter from './routes/characteristicNames';
import characteristicsRouter from './routes/characteristics';

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

// TODO: вынеси роуты в отдельный файл
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/subcategories', subcategoriesRouter);
app.use('/products', productsRouter);
app.use('/comments', commentsRouter);
app.use('/prices', pricesRouter);
app.use('/favorites', favoritesRouter);
app.use('/keywords', keywordsRouter);
app.use('/characteristic_names', characteristicNamesRouter);
app.use('/characteristics', characteristicsRouter);

// catch 404 and forward to error handler
const error404Handler: RequestHandler = (req, res, next) => { //TODO: вместо объявления переменной сразу передай ее в app.use()
  next(createError(404));
}
app.use(error404Handler);

// error handler
export type ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => any; // TODO: это объявление не надо, в нем нет смысла - TS от тебя этого не требует и тебе в нем нет никакой пользы
// TODO: здесь не надо объявлять тип возвращяемых данных, вынеси код в отдельный файл в папке middleware
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // TODO: возвращемые данные должны быть структурированными: {status: "error", message: error_message}
  console.log("An error occured")
  console.log(err.name)
  if (err.name === 'ValidationError')
    return res.status(400).send(err.errors)
  if (err.name === 'DBError' || err.name === 'NotNullViolationError') {
    console.log(`SQL query: ${err.nativeError.sql}`)
    console.log(`SQL error message: ${err.nativeError.sqlMessage}`)
    return res.status(400).send("DB error")
  }

  return res.sendStatus(err.status || 500);
  // render the error page
  // res.render('error');
}
app.use(errorHandler);

// module.exports = app;
export default app;
