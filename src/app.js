const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const { resolveRefs } = require('json-refs');
require('dotenv').config();



const passport = require('passport');
const jwtStrategy = require('./middleware/tokenValidator');
 passport.use(jwtStrategy);

 
 const indexRouter = require('./routes/index');

 const swaggerDocument = require('./swagger/index.json');



 resolveRefs(swaggerDocument, {
   location: `${__dirname}/swagger/index.json`,
 }).then((results) => {
   const fullyResolvedSwagger = results.resolved;
  //  console.log(`${__dirname}/swagger/index.json`);
  //  console.log(results);
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(fullyResolvedSwagger));
 });
 

 const app = express();

 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// app.get('/*', function(req, res, next) {
//   res.status(404).json({status:404, message: "Page not Found :("})
// });

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

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
