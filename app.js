var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const mongoose = require("mongoose");

var aboutRouter = require('./routes/about_us');
var careersRouter = require('./routes/careers');
var contact_usRouter = require('./routes/contact_us');
var homeRouter = require('./routes/home');
var protfolioRouter = require('./routes/protfolio');
var servicesRouter = require('./routes/services');
var start_new_productRouter = require('./routes/start_new_product');
var employees = require('./routes/employees');
var projects = require('./routes/projects');
var jobs = require('./routes/jobs');
var interns = require('./routes/intern');
var users = require('./routes/user');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("uploads"));
// app.use(cors());

app.use('/', homeRouter);
app.use('/careers', careersRouter);
app.use('/contact_us', contact_usRouter);
app.use('/protfolio', protfolioRouter);
app.use('/services', servicesRouter);
app.use('/start_new_product', start_new_productRouter);
app.use('/about_us', aboutRouter);
app.use('/employees', employees)
app.use('/projects', projects)
app.use('/jobs', jobs)
app.use('/interns', interns)
app.use('/users', users)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// mongoose
//   .connect("mongodb+srv://MYM:MYM@cluster0.9sjfzoq.mongodb.net/")
//   .then((result) => {
//     console.log("Database connection established");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
  
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
