const express = require('express');
const db = require('./data/dbConfig.js');
const AccountRouter = require('./accounts/accountsRouter');
const server = express();

server.use(express.json());
server.use('/accounts', AccountRouter);

server.get('/', (req, res) => {
  res.send('<h1>WebDB Challenge I</h2>');
});

module.exports = server;
