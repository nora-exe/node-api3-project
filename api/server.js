const express = require('express');

// server, routing
// remember express by default cannot parse JSON in request bodies
const server = express();
server.use(express.json());

const usersRouter = require('./users/users-router');
server.use('/api/users', usersRouter)

// middleware
const { logger } = require('./middleware/middleware');
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;