// this is called once the page is loaded
window.addEventListener('load', function() {
  // get DOM elements with document.querySelector(cssSelector)
  var navButton = document.querySelector('#nav-button');
  // this way you can register for a certain DOM event
  navButton.addEventListener('click', function() {
    alert('Clicked on #nav-button');
  });
});

