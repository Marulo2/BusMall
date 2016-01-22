'use strict';

var allClicks = 0; //global counter
var productLabels = ['Wine Glass', 'Banana', 'Bag', 'Boots', 'Chair', 'Dragon', 'Cthulhu', 'Pen', 'Scissors', 'Shark', 'Sweep', 'Water Can', 'Usb', 'Unicorn']

//constructor function
function Products(productName, path) {
  this.productName = productName; //name of the product
  this.path = path; //pathing location to call on the image
  this.clicks = 0; //counting the number a particular image was clicked
  this.displayedTimes = 0; 
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


var chartData = localStorage.getItem('chartPersist');
  if (chartData) {
    allProducts = JSON.parse(chartData);
  } else {
    console.log('Local storage empty! Initializing');
    localStorage.setItem('chartPersist', JSON.stringify(allProducts));
  }

var chartLegend = document.getElementById('chartLegend')
var showLeft = document.getElementById('left');
var showCenter = document.getElementById('center');
var showRight = document.getElementById('right');
var shownLeft;
var shownCenter;
var shownRight;

function showProduct () {
                      //0 <= .99999   *times*   13 --- since the array is 0 - 13.
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

showLeft.addEventListener('click', function() {
    handleClick(allProducts[shownLeft])  //anonymous function
});
showCenter.addEventListener('click', function() {
    handleClick(allProducts[shownCenter])
});
showRight.addEventListener('click', function() {
    handleClick(allProducts[shownRight])
});


//we need to get the button element on the HTML to give it more behavior


button();
function button() {
  if (allClicks < 3) {
    showResults.style.display = 'none';
    lsClear.style.display = 'none'
    chartLegend.style.display = 'none';
  }

  else {
    showResults.style.display = 'block';
    lsClear.style.display = 'block';
    chartLegend.style.display = 'block';
  }
};

//this function will add +1 for every click and time an image is displayed on the screen.
//the showProduct() function is called to renew a fresh set of random images
//the button() function is called to enable the button once we've reached 15 clicks.

function handleClick (objectClicked) {
  allClicks++
  objectClicked.clicks++;
  allProducts[shownLeft].displayedTimes++;
  allProducts[shownCenter].displayedTimes++;
  allProducts[shownRight].displayedTimes++;
  muhClicks();
  showProduct();
  button();
  console.log(objectClicked);
  localStorage.setItem('chartPersist', JSON.stringify(allProducts));
}

var htmlButton = document.getElementById('showResults') //DOM query, then store the HTML button into the JS var
htmlButton.addEventListener('click', handleButton); //we then add an event listener to the button that is waiting for a click

var myGraph = document.getElementById('myGraph').getContext('2d');

function handleButton(event) {
  showResults.textContent = 'Refresh Results';
  var data = {
    labels: productLabels,
    datasets: [
      {
        fillColor: "rgba(50,100,220,1)",
        strokeColor: "rgba(220,220,220,1)",
        highlightFill: "rgba(50,200,220,0.75)",
        highlightStroke: "rgba(220,220,220,1)",
        data: clicksArray
      },
    ]
  }
  new Chart(myGraph).Bar(data);
};


var clicksArray = [];
function muhClicks() {
  clicksArray = [];
  for (var i = 0; i < allProducts.length; i++) {
    clicksArray.push(allProducts[i].clicks)
  }
};

var lsClear2 = document.getElementById('lsClear');

lsClear2.addEventListener('click', handleClear);

function handleClear() {
  console.log('You have cleared storage data!');
  localStorage.clear();
}

// Web storage Notes

// sessionStorage.setItem('user', 'John Doe')
//   persists until window closes
//
// localStorage.setItem('user', 'John Doe')
//   persists until removed
//
// simple key/value store
// 10MB of primitives and JSON
//
// JSON - JavaScript Object Notation is a lightweight data-interchange format. it is easy for humans to read and write. It is easy for machines to parse and generate.
//
// examples:
// this is what JSON looks like
//   "{
//     "value":8,
//     "label":"hambella",
//     "color":"#color",
//     "highlight":"#color"
//   }"
//
//   ---
//
// JS object to JSON
//   JSON.stringify(myObject);
//
// JSON to JS object
//   JSON.parse(myString);
//
//   ---
//
//   Methods
//
//   .setItem('key',  'value')
//   .getItem('key')
//   .removeItem('key')
//   .clear()
//   .key(index)
//   .length
