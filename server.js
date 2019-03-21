const express = require('express');
const helmet = require('helmet');

const userRouter = require('./data/helpers/userRouter.js');
const postRouter = require('./data/helpers/postsRouter.js');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/user', userRouter);

server.use('/api/post', postRouter);

server.get('/', (req, res, next) => {
  res.send(`
    <h2>Lambda Posterboard</h2>
    <p>Welcome to the Lambda Posterboard</p>
    `);
});

module.exports = server;