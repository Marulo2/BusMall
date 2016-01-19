'use strict':

function Products(productName, path) {
  this.productName = productName;
  this.path = path;
  this.clicks = 0;
  this.productShown = 0;
  this.percentageClicked = 0;
  this.findPercentage = function () {
    this.percentClicked = (this.timesClicked / this.productShown).toFixed(2) * 100;
  };
};
var allClicks = 0;

var allProducts = [new Product('wine-glass', 'img/wine-glass.jpg'),
                  new Product('banana', 'img/banana.jpg'),
                  new Product('bag', 'img/bag.jpg'),
                  new Product('boots', 'img/boots.jpg'),
                  new Product('chair', 'img/chair.jpg'),
                  new Product('dragon', 'img/dragon.jpg'),
                  new Product('cthulu', 'img/cthulu.jpg'),
                  new Product('pen', 'img/pen.jpg'),
                  new Product('scissors', 'img/scissors.jpg'),
                  new Product('shark', 'img/shark.jpg'),
                  new Product('sweep', 'img/sweep.jpg'),
                  new Product('water-can', 'img/water-can.jpg'),
                  new Product('usb', 'img/usb.jpg'),
                  new Product('unicorn', 'img/unicorn.jpg')];

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
}
