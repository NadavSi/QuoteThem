var createError = require('http-errors');
var express = require('express');
var path = require('path');
const hbs = require("hbs");
const fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

var app = express();

// view engine setup
hbs.registerPartials(__dirname + '/views/partials');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//logging
if (process.env.NODE_ENV === 'delopment') {
  app.use(morgan('dev'));
}
var port = process.env.PORT || 3000
app.listen(port, function () {
  console.log(`init server on port: ${port}, ${process.env.NODE_ENV} mode`);
});

//set all avaiable routes
let routePath = './routes/';
fs.readdirSync(routePath).forEach(function(file) { 
  const route = routePath + file;
  if (file == 'index.js') {
    app.use('/', require(route));
  } else {
    app.use('/' + file.replace('.js', ''), require(route));
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
