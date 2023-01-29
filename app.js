require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

//Passport
var passport = require('passport');
var session = require('express-session');
const cors = require('cors');
const passportSetup = require('./passport');
//Database
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var app = express();

//AuthenticationSetup
app.use(cookieParser());
app.use(session({
  secret: "authapp",
  resave: false,
  saveUninitialized: false,
  cookie: { sameSite:true, maxAge: 60 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: "GET,PUT,POST,DELETE"
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', indexRouter);
app.use('/auth', authRouter);

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

app.listen(3000);
module.exports = app;
