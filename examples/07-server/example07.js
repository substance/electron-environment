/*eslint-disable no-alert */
var sendRequest = require('../../lib/sendRequest');

window.addEventListener('load', function() {
  var reqButton = document.querySelector('#request-button');
  reqButton.addEventListener('click', function() {
    var url = "http://localhost:4444/api/helloworld";
    sendRequest({ method: 'GET', url: url })
      .then(function(data) {
        alert("Received data: " + data);
      })
      .catch(function(err) {
        alert("Request failed: " + err);
      });
  });
});
