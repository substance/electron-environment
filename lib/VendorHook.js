'use strict';

var path = require('path');

function VendorHook() {
  this.prefix = '/node_modules/';
}

VendorHook.prototype.shouldHandleRequest = function(params) {
  return params.uri.startsWith(this.prefix);
};

VendorHook.prototype.handleRequest = function(params, finish, serveFile) {
  var uri = params.uri.slice(this.prefix.length);
  var uriParamIdx = uri.indexOf('?');
  if (uriParamIdx >= 0) {
    uri = uri.slice(0, uriParamIdx);
  }
  var rootDir = params.rootDir;
  var vendorFile = path.join(rootDir, 'node_modules', uri);
  // console.log('VendorHook: vendorFile', vendorFile);
  serveFile(vendorFile, finish);
};

module.exports = VendorHook;
