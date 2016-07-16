'use strict';
/*
  This is used by electron to setup the application.
  It spawns an extra browser window loading `index.html`.
*/
var electron = require('electron');
/*
 Hooks for serving files
*/
// This is kind of a middle-ware, establising a hook on file requests
// asking configured hook to handle the file request
// and falling back to just serve the plain file if no hook has
// handled the request
var FileHooks = require('./lib/FileHooks');
// bundles js files using browserify
var BrowserifyHook = require('./lib/BrowserifyHook');
// compiles a less file into css
var LessHook = require('./lib/LessHook');
// provides convenient access to packages in node_modules
var VendorHook = require('./lib/VendorHook');

var app = electron.app;
var protocol = electron.protocol;
var shell = electron.shell;
var BrowserWindow = electron.BrowserWindow;

var win;

function createWindow(url) {
  win = new BrowserWindow({
    width: 1000,
    height: 800,
    useContentSize: true,
    autoHideMenuBar: true,
  });
  win.loadURL(url);
  // Open the DevTools?
  // win.webContents.openDevTools();
  // it is important to dereference the created window object
  win.on('closed', function() {
    win = null;
  });
}

app.on('ready', function() {
  new FileHooks({
    rootDir: __dirname,
    hooks: [
      new BrowserifyHook(),
      new LessHook(),
      new VendorHook()
    ]
  }).register(protocol);
  // the application will be served from the file system
  createWindow("file:///");
  // make sure that external links are not opened within
  // the native application
  win.webContents.on('will-navigate', function(e, url) {
    if (!url.startsWith('file://')) {
      e.preventDefault();
      shell.openExternal(url);
    }
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// this is used by client-server examples
var server = require('./server/server');
var PORT = 4444;
server.listen(PORT);
