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

var showLeft = document.getElementById('left');
var showCenter = document.getElementById('center');
var showRight = document.getElementById('right');
var shownLeft;
var shownCenter;
var shownRight;

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

showLeft.addEventListener('click', function() {
    handleClick(allProducts[shownLeft])
  });
showCenter.addEventListener('click', function() {
    handleClick(allProducts[shownCenter])
});
showRight.addEventListener('click', function() {
    handleClick(allProducts[shownRight])
});


//we need to get the button element on the HTML to give it more behavior

var htmlButton = document.getElementById('showResults')

button();
function button() {
  if (allClicks < 3) {
    showResults.style.display = 'none';
  }

  else {
    showResults.style.display = 'block';
    // showRight.setAttribute('hidden', true); //hide images after 15 clicks
    // showLeft.setAttribute('hidden', true);
    // showCenter.setAttribute('hidden', true);
  }
};

//this function will add +1 for every click and time an image is displayed on the screen.
//the showProduct() function is called to renew a fresh set of random images
//the button() function is called to enable the button once we've reached 15 clicks.

function handleClick (objectClicked) {
  allClicks++
  muhClicks();
  objectClicked.clicks++;
  allProducts[shownLeft].displayedTimes++;
  allProducts[shownCenter].displayedTimes++;
  allProducts[shownRight].displayedTimes++;
  showProduct();
  button();
  console.log(objectClicked);
}

htmlButton.addEventListener('click', handleButton);

function handleButton(event) {
  showResults.textContent = 'Refresh Results';
  var myGraph = document.getElementById('myGraph').getContext('2d');
  var data = {
    labels: productLabels,
    datasets: [
      {
        fillColor: "rgba(50,100,220,1)",
        strokeColor: "rgba(220,220,220,1)",
        data: clicksArray
      },
    ]
  }
  new Chart(myGraph).Bar(data);
}

var clicksArray = [];
function muhClicks() {
  clicksArray = [];
  for (var i = 0; i < allProducts.length; i++) {
    clicksArray.push(allProducts[i].clicks)
  }
}
