const express = require('express');
const server = express();
const cors = require('cors');
const helmet = require('helmet');
const projectsRouter = require('./routes/projectsRoutes');
const actionsRoute = require('./routes/actionRoutes');

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRoute);

module.exports = server;