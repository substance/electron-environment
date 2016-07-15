/*eslint-disable no-alert */

window.addEventListener('load', function() {
  var reqButton = document.querySelector('#request-button');
  reqButton.addEventListener('click', function() {
    sendRequest();
  });
});

function sendRequest() {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      var responseText = xmlhttp.responseText;
      alert("Received response from server: " + responseText);
    }
  };

  var url = "http://localhost:4444/api/helloworld";
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}
