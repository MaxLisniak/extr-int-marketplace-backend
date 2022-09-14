import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import type { NextFunction, RequestHandler, Request, Response } from "express";
import dotenv from 'dotenv';
dotenv.config();

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
const error404Handler: RequestHandler = (req, res, next) => {
  next(createError(404));
}
app.use(error404Handler);

// error handler
export type ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => any;
const errorHandler: ErrorRequestHandler = (err: any, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  return res.sendStatus(err.status || 500);
  // res.render('error');
}
app.use(errorHandler);

// module.exports = app;
export default app;
