var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');
const subcategoriesRouter = require('./routes/subcategories');
const productsRouter = require('./routes/products');
const commentsRouter = require('./routes/comments');
const pricesRouter = require('./routes/prices');
const favoritesRouter = require('./routes/favorites');
const keywordsRouter = require('./routes/keywords');
const characteristicNamesRouter = require('./routes/characteristic_names');
const characteristicsRouter = require('./routes/characteristics');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
