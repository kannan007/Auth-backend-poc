const userRouter = require('./users');
const postRouter = require('./posts');
const express = require('express');

const app = express();

app.use('/users', userRouter);
app.use('/posts', postRouter);

module.exports = app;
