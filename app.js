const express = require('express');
const morgan = require('morgan');

const appError = require('./utilities/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
//Middlewares
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.get('*', (req, res, next) => {
  next(new appError(`can't find ${req.originalUrl} on the server`, 404));
})

app.use(globalErrorHandler)

module.exports = app;