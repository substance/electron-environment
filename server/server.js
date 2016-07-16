var express = require('express');
var server = express();

server.get('/api/helloworld', function(req, res) {
  res.status(200).send('Hello World');
});

server.get('/api/someparagraphs', function(req, res) {
  var someParagraphs = require('./some-paragraphs')
  res.status(200).json(someParagraphs);
});

module.exports = server;
