
/*
 *  #############  Create a list that holds all of your cards  ############# 
 */
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor",
  "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", 
   "fa fa-bomb"];

const cardsContainer = document.querySelector('.deck')

/*
 *  #############  Create empty Arrays  #############
 */
let openedCards = [];
let matchedCards = [];

/* 
 * #############  Initialize the game  #############
 */
function init() {
	for (let i = 0; i < icons.length; i++) {
	const card = document.createElement("li");
	card.classList.add("card");
	card.innerHTML = `<i class="${icons[i]}"></i>`;
	cardsContainer.appendChild(card);
	 
	// Add Click Event to each Card
	click(card);
	}
	// Add a one time Click Event to start the timer 
	cardsContainer.addEventListener("click", first);
	function first(e){
    	e.stopImmediatePropagation();
   		startTimer();
    	this.removeEventListener("click", first);
		}
 }

/*
 *  #############  Shuffle the cards  ############# 
 */
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
 }

 shuffle(icons);
/*
 * #############  Click Event  #############
 */
function click(card) {

	//  Card Click Event 
		card.addEventListener("click", function(){

		const currentCard = this;
		const previousCard = openedCards[0];

		
		// we have an existing OPENED card
		if(openedCards.length === 1) {

			card.classList.add("open", "show", "disable");
			openedCards =  [];
			openedCards.push(this);


			// we should compare our 2 opened cards 
			compare(currentCard, previousCard);

		} else {
		// we don't have any opened cards 
		card.classList.add("open", "show", "disable");
		openedCards.push(this);
		}

	});
	}

/*
 * #############  Compare the 2 cards  ############# 
 */
function compare(currentCard, previousCard) {

		// Matcher
		if(currentCard.innerHTML === previousCard.innerHTML) {

				// Matched 
				currentCard.classList.add("match");
				previousCard.classList.add("match");

				matchedCards.push(currentCard, previousCard);

				openedCards =  [];

				// Check if the game is over
				isOver();

			} else {

				openedCards =  [];

				// Wait 1000ms then run the code 
				currentCard.classList.add("mismatch", 1000);
				previousCard.classList.add("mismatch", 1000);
				

				// Wait 1000ms then run the code 
				setTimeout(function(){
					currentCard.classList.remove("mismatch","open", "show", "disable");
					previousCard.classList.remove("mismatch","open", "show", "disable");
				}, 1000);		
			}

		// Add New Move
		addMove();
	}

/*
 * #############  Check if the game is over  #############
 */
function isOver() {
	if(matchedCards.length === icons.length) {
		stopTimer();
		updateModal();
		modal.style.display = "block";

	 }
	}

/* 
 * #############  Add move  #############
 */
const movesContainer = document.querySelector(".moves");
		let moves = 0;
		movesContainer.innerHTML = 0;
		function addMove() {
		moves++;
		movesContainer.innerHTML = moves;

		// Set the rating 
		rating();
	}

/* 
 * #############  Rating  #############
 */
const starsContainer = document.querySelector(".stars");
function rating() {
	switch(moves) {
		case 16:
			starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>`;
        break;
					// Try to implement a counting function in addition of icons
        case 22:
        	starsContainer.innerHTML = `<li><i class="fa fa-star">
        	</i></li>`;
        break;
	}
 }
/* Begin Attribution
	// Referenced helper code for updating the move, compare
	// the card and rating the user from Udacity Student Leader Yahya Elharony,
End Attribution */
/*
 * #############  Timer  #############   
 */

let hour = 0;
let minutes = 0;
let seconds = 0;

let timer;

let initialClick = false; 

function startTimer() {
	timer = setInterval(function(){
		seconds++;
		if(seconds == 60) {
			minutes++;
			seconds = 0;
		}
		// console.log(formatTime());
		renderTime();
	}, 1000);
 }

function stopTimer() {
	clearInterval(timer);
 }

function formatTime() {
	let sec = seconds > 9 ? String(seconds) : '0' + String(seconds);
	let min = minutes > 9 ? String(minutes) : '0' + String(minutes);
	return min + ':' + sec;
 }

function renderTime() {
  document.getElementById("time-count").innerText = formatTime();
  const theTimer = document.querySelector('#time-count')
 } 

function restartGame() {
	stopTimer();
	document.getElementById("time-count").innerText = "00:00";
	hour = 0;
	minutes = 0;
	seconds = 0;
	initialClick = false;
	// startTimer();
 }
/* Begin Attribution
	// Referenced helper code for updating the timer, and
	// starting and stopping the timer from Udacity Student Leader Ryan Waite,
End Attribution */

/*
 * #############  Modal  #############
 */


// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function updateModal() {
	// get time from modal
	const timeStat = document.querySelector('.time-stat');
	// write time to modal
	timeStat.innerHTML = 'You won the game in ' + minutes + ' minute(s)' +' and ' + seconds + ' second(s)';

	// get moves-stat to modal 
	const moveStat = document.querySelector('.moves-stat');
	// write moves-stat to modal 
	moveStat.innerHTML = 'with a total of ' + moves + ' moves.';

	// get star-stat from modal
	const starStat = document.querySelector('.star-stat');
	// write star-stat to modal
	starStat.innerHTML = starsContainer.innerHTML;
}

/*
 * #############  Restart Buttons  #############
 */

const restartBtn = document.querySelector(".restart");
 restartBtn.addEventListener("click", function() {
 	// Delete ALL cards 
 	cardsContainer.innerHTML = "";
 	// Call `init` to create new cards 
 	init(); 
 	shuffle(icons);
 	// Reset ANY RELATED variables
 	restartGame();  
 	matchedCards = [];
 	moves = 0;
 	movesContainer.innerHTML = moves;
 	starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
 	 <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;
 });

 const restartBtnModal = document.querySelector('.btn');
 	restartBtnModal.addEventListener("click", function(){
 		// Delete ALL cards 
 	cardsContainer.innerHTML = "";
 	// Call `init` to create new cards 
 	init(); 
 	shuffle(icons);
 	// Reset ANY RELATED variables
 	restartGame();  
 	matchedCards = [];
 	moves = 0;
 	movesContainer.innerHTML = moves;
 	starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
 	 <li><i class="fa fa-star"></i></li> <li><i class="fa fa-star"></i></li>`;
 	 modal.style.display = "none";
 	});

/*
 * #############  Start the game ############# 
 */
init();

