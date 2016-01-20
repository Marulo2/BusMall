'use strict';

var allClicks = 0; //global counter


//constructor function
function Products(productName, path) {
  this.productName = productName; //name of the product
  this.path = path; //pathing location to call on the image
  this.clicks = 0; //counting the number a particular image was clicked
  this.productShown = 0; //how many times the product was displayed
  this.percentageClicked = 0;
  this.findPercentage = function () {
    this.percentageClicked = (this.clicks / this.productShown).toFixed(3) * 100;
  };
};

//instead of creating new instances one by one, we can create an array with every product in a single instance.

var allProducts = [new Products('wine-glass', 'img/wine-glass.jpg'),
                  new Products('banana', 'img/banana.jpg'),
                  new Products('bag', 'img/bag.jpg'),
                  new Products('boots', 'img/boots.jpg'),
                  new Products('chair', 'img/chair.jpg'),
                  new Products('dragon', 'img/dragon.jpg'),
                  new Products('cthulu', 'img/cthulhu.jpg'),
                  new Products('pen', 'img/pen.jpg'),
                  new Products('scissors', 'img/scissors.jpg'),
                  new Products('shark', 'img/shark.jpg'),
                  new Products('sweep', 'img/sweep.png'),
                  new Products('water-can', 'img/water-can.jpg'),
                  new Products('usb', 'img/usb.gif'),
                  new Products('unicorn', 'img/unicorn.jpg')];

//
//
//

var showLeft = document.getElementById('left');
var showCenter = document.getElementById('center');
var showRight = document.getElementById('right');
var shownLeft = 0;
var shownCenter = 0;
var shownRight = 0;

//need help understanding this part more, only got it running because I was referencing code review stuff

function showProduct () {
  shownLeft = Math.floor(Math.random() * allProducts.length);
  showLeft.innerHTML = '<img src ="' + allProducts[shownLeft].path + '">';

  shownCenter = Math.floor(Math.random() * allProducts.length);
  while (shownCenter === shownLeft) {
    shownCenter = Math.floor(Math.random() * allProducts.length);
  }
  showCenter.innerHTML = '<img src="' + allProducts[shownCenter].path + '">';

  shownRight = Math.floor(Math.random() * allProducts.length);
  while (shownRight === shownLeft || shownRight === shownCenter) {
    shownRight = Math.floor(Math.random() * allProducts.length);
  }
  showRight.innerHTML = '<img src="' + allProducts[shownRight].path + '">';
}

showProduct();

//with the variables declared above, we can hook them up to event listeners to watch for clicks

showLeft.addEventListener('click', handleLeft);
showCenter.addEventListener('click', handleCenter);
showRight.addEventListener('click', handleRight);

//these functions will add +1 for every click and time an image is displayed on the screen.
//the showProduct() function is called to renew a fresh set of random images
//the button() function is called to enable the button once we've reached 15 clicks.

function handleLeft () {
  allClicks++
  allProducts[shownLeft].clicks++;
  allProducts[shownLeft].productShown++;
  allProducts[shownCenter].productShown++;
  allProducts[shownRight].productShown++;
  button();
  showProduct();
}

//we need to get the button element on the HTML to give it more behavior

var htmlButton = document.getElementById('showResults')

function button() {
  if (allClicks < 15) {
    showResults.style.display = 'none';
  }

  else {
    showResults.style.display = 'block';
    // showRight.setAttribute('hidden', true); //hide images after 15 clicks
    // showLeft.setAttribute('hidden', true);
    // showCenter.setAttribute('hidden', true);
  }
};

//same as before but for the center image.

function handleCenter() {
  allClicks++;
  allProducts[shownCenter].clicks++;
  allProducts[shownLeft].productShown++;
  allProducts[shownCenter].productShown++;
  allProducts[shownRight].productShown++;
  button();
  showProduct();
}

//same as before but for the right image.

function handleRight() {
  allClicks++;
  allProducts[shownRight].clicks++;
  allProducts[shownLeft].productShown++;
  allProducts[shownCenter].productShown++;
  allProducts[shownRight].productShown++;
  button();
  showProduct();
}


htmlButton.addEventListener('click', handleButton);

function handleButton(event) {
  showResults.textContent = 'Refresh Results';
  var displayResults = document.getElementById('displayResults');
  displayResults.textContent = '';
  var showListedResults = document.createElement('ul');

  for (var i = 0; i < allProducts.length; i++) {
    allProducts[i].findPercentage();
    var results = document.createElement('li');
    results.textContent = allProducts[i].productName + ' was clicked ' + allProducts[i].clicks + ' times when shown to the viewer ' + allProducts[i].productShown + ' times. Total percentage: ' + allProducts[i].percentageClicked + '%.';
    showListedResults.appendChild(results);
  }
  displayResults.appendChild(showListedResults);
}

//chart.js stuff below

var productGraph = document.getElementById('productGraph').getContext('2d');
new Chart(productGraph).Bar(productData);

var productData = {
  labels: ['pen', 'baby', 'shark'],
  datasets: [
    {
      label: Products.productName,
      fillColor: '#48A497',
      strokeColor: '#48A4D1',
      data: [43, 63, 11]
    }
  ]
}
