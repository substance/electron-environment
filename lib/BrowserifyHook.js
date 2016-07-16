'use strict';

var path = require('path');

function BrowserifyHook() {}

BrowserifyHook.prototype.shouldHandleRequest = function(params) {
  var filePath = params.filePath;
  var ext = path.extname(filePath);
  return ext === ".js" || ext === ".jsx";
};

BrowserifyHook.prototype.handleRequest = function(params, finish) {
  var sourcePath = params.filePath;
  console.log('Bundling %s with browserify', sourcePath);
  var startTime = Date.now();
  var browserify = require('browserify');
  browserify({
    debug: true,
    extensions: ['.jsx'],
    cache: {},
    packageCache: {},
  })
  .add(sourcePath)
  .transform("babelify", {
    plugins: [
      // support for es6 import/export
      // Note: the rest of es6 is supported natively
      // by the chrome
      // just import/export needs to be mapped to commonjs
      // so that browserify can work with it
      ["transform-es2015-modules-commonjs-simple", {
        "noMangle": true,
        "addExports": true
      }],
      // JSX support
      "syntax-jsx",
      [ "transform-react-jsx", {
        // this will generate calls such as in
        // $$(MyComp, props, ...children)
        "pragma": "$$"
      }],
    ],
  })
  .bundle(function(err, buf) {
    if (err) {
      console.error(err);
      finish(-2);
    } else {
      console.info('browserify finished after %s ms', Date.now()-startTime);
      finish({
        data: buf,
        mimeType: 'application/javascript'
      });
    }
  });
};

module.exports = BrowserifyHook;
