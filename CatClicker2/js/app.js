

// var catClicker = document.querySelector('.cat');
// var movesContainer = document.querySelector('.moves');
// var nameContainer = document.querySelector('.name');

// var catClickerP = document.querySelector('.cat1');
// var movesContainerP = document.querySelector('.moves1');
// var nameContainerP = document.querySelector('.name1');


// let moves = 0;
// let movesP = 0;
// let catName = "Shusha";
// let catNameP = "Gaston";


// catClicker.addEventListener('click', function(){

// 		movesContainer.innerHTML = 0;
// 		moves++;
// 		movesContainer.innerHTML = moves;
// 		nameContainer.innerHTML = catName;

// 	}
// , false);

// catClickerP.addEventListener('click', function(){

// 		movesContainerP.innerHTML = 0;
// 		movesP++;
// 		movesContainerP.innerHTML = movesP;
// 		nameContainerP.innerHTML = catNameP;

// 	}
// , false

let cats = ['Kitty', 'Mitty', 'Finny', 'Lilly', 'Vinny', 'Zizzy'];
let images = ['image/cat1.jpg', 'image/cat2.jpg', 'image/cat3.jpg', 'image/cat4.jpg', 'image/cat5.jpg', 'image/cat6.jpg'];

for (let i = 0; i < cats.length; i++) {
	let cat = cats[i];
	let image = images[i];
	let clickCounter = 0;

	// Create list of cats
	let catContainer = document.querySelector('.cat-list');
	let catListItem = document.createElement('li');
	catListItem.innerHTML = cat;
	catContainer.appendChild(catListItem);

	// Display of the images
 	let catDisplay = document.querySelector('.cat-display');

	let clickNumber = document.querySelector('.click-number');

	// Click event for each cat
	catListItem.addEventListener('click', (function(e) {
		return function(e) {
			// Clean display for new cat
			catDisplay.innerHTML = "";

			// Add specific name
		 	let catName = document.createElement('h3');
		 	catName.innerHTML = cat;


			// Add specific image
		 	let catImg = document.createElement('img');
		 	catImg.src = image;

		 	// Attach specific image and name to the Display Area 
		 	catDisplay.appendChild(catImg);
		 	catDisplay.appendChild(catName);

		 	// Attach specific counter of the cat to the HTML.
		 	// Retains last number of click.
		 	clickNumber.innerHTML = clickCounter;		 	

		 	// Click event for each image of specific cat
			catImg.addEventListener('click', (function(e) {
				return function(e) {
				 	clickCounter++;
				 	clickNumber.innerHTML = clickCounter;		 	
				};
			})(cat));
		};
	})(cat));
};