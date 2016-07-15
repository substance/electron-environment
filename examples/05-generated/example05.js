// import data from file `data.js`
var data = require('./data');

window.addEventListener('load', function() {
  var navButton = document.querySelector('#nav-button');
  navButton.addEventListener('click', function() {
    alert('Clicked on #nav-button');
  });
  // adding content programmatically
  var pageBody = document.querySelector('.page-body');
  data.forEach(function(text) {
    var p = document.createElement('p');
    p.textContent = text;
    pageBody.appendChild(p);
  });
});
