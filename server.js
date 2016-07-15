// used to serve things dynamically
var express = require('express');
var server = express();

server.get('/api/helloworld', function(req, res) {
  res.status(200).send('Hello World');
});

module.exports = server;
