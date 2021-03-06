var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var CORS = require('cors');

var app = express();
app.use(CORS());

const session = require('express-session');
var indexRouter = require('./routes/index');
var userInfoRouter = require('./routes/usersInfo');
var usersRouter = require('./routes/users');
var mainRouter = require('./routes/mainBoard');

var universityRouter = require('./routes/university');
var freeBoardrouter = require('./routes/freeboard');

var culturalRouter=require('./routes/cultural')
var gatheringBoardrouter = require('./routes/gathering');


var bodyParser = require('body-parser');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded({limit: '50mb', extended: true,  parameterLimit:50000}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(bodyParser.json({limit: '50mb', extended: true}));
//app.use(bodyParser.urlencoded({limit: '50mb', extended: true,  parameterLimit:50000}));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/main', mainRouter);
app.use('/api/universityList', universityRouter);
app.use('/api/freeboard',freeBoardrouter);
app.use('/api/cultural',culturalRouter);

app.use('/api/gatheringboard', gatheringBoardrouter);

app.use('/api/users',userInfoRouter);


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