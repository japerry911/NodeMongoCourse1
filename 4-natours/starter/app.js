const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const API_VERSION = 'v1';

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log('Hello');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
app.use(`/api/${API_VERSION}/tours`, tourRouter);
app.use(`/api/${API_VERSION}/users`, userRouter);

module.exports = app;
