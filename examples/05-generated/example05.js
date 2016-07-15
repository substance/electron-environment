// import data from file `data.js`
var data = require('./data');

window.addEventListener('load', function() {
  // adding content programmatically
  var pageBody = document.querySelector('.page-body');
  data.forEach(function(text) {
    var p = document.createElement('p');
    p.textContent = text;
    pageBody.appendChild(p);
  });
});
