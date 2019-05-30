

var catClicker = document.querySelector('.cat');
var movesContainer = document.querySelector('.moves');
var nameContainer = document.querySelector('.name');

var catClickerP = document.querySelector('.cat1');
var movesContainerP = document.querySelector('.moves1');
var nameContainerP = document.querySelector('.name1');


let moves = 0;
let movesP = 0;
let catName = "Shusha";
let catNameP = "Gaston";


catClicker.addEventListener('click', function(){

		movesContainer.innerHTML = 0;
		moves++;
		movesContainer.innerHTML = moves;
		nameContainer.innerHTML = catName;

	}
, false);

catClickerP.addEventListener('click', function(){

		movesContainerP.innerHTML = 0;
		movesP++;
		movesContainerP.innerHTML = movesP;
		nameContainerP.innerHTML = catNameP;

	}
, false);