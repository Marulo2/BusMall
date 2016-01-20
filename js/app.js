'use strict';

function Products(productName, path) {
  this.productName = productName;
  this.path = path;
  this.clicks = 0;
  this.productShown = 0;
  this.percentageClicked = 0;
  this.findPercentage = function () {
    this.percentageClicked = (this.clicks / this.productShown).toFixed(2) * 100;
  };
};

var allClicks = 0;

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

var shownLeft = 0;
var shownCenter = 0;
var shownRight = 0;
var showLeft = document.getElementById('left');
var showCenter = document.getElementById('center');
var showRight = document.getElementById('right');

function showProduct () {
  shownLeft = Math.floor(Math.random()*allProducts.length);
  showLeft.innerHTML = '<img src ="' + allProducts[shownLeft].path + '">';

  shownCenter = Math.floor(Math.random()*allProducts.length);
  while (shownCenter === shownLeft) {
    shownCenter = Math.floor(Math.random()*allProducts.length);
  }
  showCenter.innerHTML = '<img src="' + allProducts[shownCenter].path + '">';

  shownRight = Math.floor(Math.random()*allProducts.length);
  while (shownRight === shownLeft || shownRight === shownCenter) {
    shownRight = Math.floor(Math.random()*allProducts.length);
  }
  showRight.innerHTML = '<img src="' + allProducts[shownRight].path + '">';
}

showProduct();

showLeft.addEventListener('click', handleLeft);
showCenter.addEventListener('click', handleCenter);
showRight.addEventListener('click', handleRight);

function handleLeft () {
  allClicks++
  allProducts[shownLeft].clicks++;
  allProducts[shownLeft].productShown++;
  allProducts[shownCenter].productShown++;
  allProducts[shownRight].productShown++;
  button();
  showProduct();
}

function handleCenter() {
  allClicks++;
  allProducts[shownCenter].clicks++;
  allProducts[shownLeft].productShown++;
  allProducts[shownCenter].productShown++;
  allProducts[shownRight].productShown++;
  button();
  showProduct();
}

function handleRight() {
  allClicks++;
  allProducts[shownRight].clicks++;
  allProducts[shownLeft].productShown++;
  allProducts[shownCenter].productShown++;
  allProducts[shownRight].productShown++;
  button();
  showProduct();
}

var htmlButton = document.getElementById('showResults')
button();
function button() {
  if (allClicks < 15) {
    showResults.style.display = 'none';
  }

  else {
    showResults.style.display = 'block';
  }
};

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
