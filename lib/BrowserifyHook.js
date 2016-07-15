'use strict';

var path = require('path');

function BrowserifyHook() {}

BrowserifyHook.prototype.shouldHandleRequest = function(params) {
  var filePath = params.filePath;
  var ext = path.extname(filePath);
  return ext === ".js";
};

BrowserifyHook.prototype.handleRequest = function(params, finish) {
  var sourcePath = params.filePath;
  // console.log('Bundling %s with browserify', sourcePath);
  var browserify = require('browserify');
  browserify({ debug: true, cache: false })
    .add(sourcePath)
    .bundle(function(err, buf) {
      if (err) {
        console.error(err);
        finish(-2);
      } else {
        finish({
          data: buf,
          mimeType: 'application/javascript'
        });
      }
    });
};

module.exports = BrowserifyHook;
