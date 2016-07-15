
window.addEventListener('load', function() {
  var editor = document.querySelector('#editor');

  // as we are using browserify, we must use global.require()
  // to get access to electron's API
  var app = global.require('electron').remote.app;
  var fs = global.require('fs');
  var path = global.require('path');
  var filePath = path.join(app.getPath('documents'), 'example06.html');

  function load() {
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf8');
    }
  }

  function save() {
    fs.writeFileSync(filePath, editor.innerHTML);
  }

  // try to load a previously save file
  var fileContent = load();
  if (fileContent) {
    editor.innerHTML = fileContent;
  } else {
    // .. otherwise seed the editor with some content
    var data = require('../05-generated/data');
    data.forEach(function(text) {
      var p = document.createElement('p');
      p.textContent = text;
      editor.appendChild(p);
    });
  }

  // let's save the content when user clicks on save
  var saveButton = document.querySelector('#save-button');
  saveButton.addEventListener('click', function() {
    console.log('Saving to ', filePath);
    save();
  });

  // finally we remove access to the native API, for sake of security
  delete global.require;
});
