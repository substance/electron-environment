var fs = require('fs');
var path = require('path');
var mime = require('mime');

function Hooks(params) {
  this.rootDir = path.normalize(params.rootDir || '.');
  this.hooks = params.hooks || [];
  this.protocol = 'file';

  // bind so that we can pass it to protocol
  this.handler = this.handler.bind(this);
}

Hooks.prototype.register = function(protocol) {
  protocol.interceptBufferProtocol(this.protocol, this.handler, function(err) {
    if (err) console.error(err);
    else console.info("Activated file hooks");
  });
};

Hooks.prototype.handler = function(request, finish) {
  // console.log('Handling request', request);
  var uri = request.url.substr(this.protocol.length+3);
  var filePath = uri;
  if (!filePath) filePath = '/';
  if (filePath && filePath[filePath.length-1] === '/') {
    filePath = path.join(filePath, 'index.html');
  }
  // console.log('... filePath', filePath);
  filePath = path.normalize(path.join(this.rootDir, filePath));
  // console.log('... normalized filePath', filePath);
  // check if there is a hook registered
  var params = {
    request: request,
    filePath: filePath,
    rootDir: this.rootDir,
    uri: uri
  };
  for (var i = 0; i < this.hooks.length; i++) {
    var hook = this.hooks[i];
    if (hook.shouldHandleRequest(params)) {
      hook.handleRequest(params, finish, _serveFile);
      return;
    }
  }
  if (fs.existsSync(filePath)) {
    _serveFile(filePath, finish);
    return;
  }
  finish(-6);
};

function _serveFile(filePath, finish) {
  // console.log('Serving file', filePath);
  fs.readFile(filePath, function(err, buf) {
    if (err) {
      console.error('.. failed:', err);
      if (err.errno === 34) {
        finish(-6); // net::ERR_FILE_NOT_FOUND
      } else {
        finish(-2); // net::FAILED
      }
      return;
    }
    finish({
      data: buf,
      mimeType: mime.lookup(filePath) || 'text/plain'
    });
  });
}

module.exports = Hooks;
