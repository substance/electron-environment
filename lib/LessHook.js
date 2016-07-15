'use strict';

var fs = require('fs');
var path = require('path');

function LessHook() {}

LessHook.prototype.shouldHandleRequest = function(params) {
  var filePath = params.filePath;
  var ext = path.extname(filePath);
  var lessFile = params.filePath.slice(0, -3) + "less";
  return (
    ext === ".css" &&
    !fs.existsSync(filePath) &&
    fs.existsSync(lessFile)
  );
};

LessHook.prototype.handleRequest = function(params, finish) {
  var lessFile = params.filePath.slice(0, -3) + "less";
  _less(lessFile, params.rootDir, finish);
};

function _less(lessFile, rootDir, finish) {
  var less = require('less');
  var lessInput = fs.readFileSync(lessFile, 'utf8');
  var lessFileDir = path.dirname(lessFile);
  var basepath = lessFileDir.replace(/\\/g, '/');
  var rootpath = rootDir.replace(/\\/g, '/');
  less.render(lessInput, {
    rootPath: rootDir,
    filename: lessFile,
    relativeUrls: true,
    sourceMap: {
      sourceMapBasepath: rootpath,
      sourceMapRootpath: path.relative(lessFileDir, rootDir),
      sourceMapFileInline: true
    }
  }, function(err, output) {
    if (err) {
      console.error(err);
      finish(-2);
    } else {
      finish({
        data: new Buffer(output.css),
        mimeType: 'text/css'
      });
    }
  });
}

module.exports = LessHook;
