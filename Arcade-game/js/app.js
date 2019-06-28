//-------------------------------------------------
// Global
//-------------------------------------------------

let score = 0;
let lives = 3;
// Get the modal 
let modal = document.getElementById('myModal');

// Get the button that starts the game again and resets the whole board
let btn = document.getElementById("play-again");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

//-------------------------------------------------
// Audio - Source: https://downloads.khinsider.com/game-soundtracks/album/angry-birds-seasons
//-------------------------------------------------

var scoreUpSound = new Audio("audio/up.mp3");
var collisionSound = new Audio("audio/collision.mp3");
var winningSound = new Audio("audio/areaClear.mp3");
var musicSound = new Audio("audio/mario.mp3");
var gameOverSound = new Audio("audio/gameOver.mp3");


//-------------------------------------------------
// Create Enemies 
//-------------------------------------------------

let Enemy = function(x,y, speed) {
    "use strict";
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    "use strict";
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //Bugs appearing headfirst on the screen with random speeds
    //Source: https://www.w3schools.com/jsref/jsref_random.asp

    if (this.x >= 505) {
        this.x = -60;
        this.speed = 100 + Math.floor((Math.random() * 100) + 1); 
    }
    //-------------------------------------------------
    // Collision, condition and consequence - Source: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection 
    //-------------------------------------------------

    if (this.x < player.x + 60 &&
    this.x + 60 > player.x &&
    this.y < player.y + 40 &&
    40 + this.y > player.y)
    { 
        collisionSound.play();
        player.reset();
        lives -= 1;
        score -= 50;
        if (lives <= 0) {
            player.reset();
            score = 0;
            modal.style.display = "block";
            document.getElementById('title').textContent = `Game Over`;
            document.getElementById('emoji').innerHTML = `<img src="images/enemy-bug.png" alt="ennemy">`;
            document.getElementById('winning').textContent = `You lost all your lives !`;
            dismissModal();
            musicSound.pause();
            gameOverSound.play();
        } 
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    drawScore();
    drawTitle();
};

// Counting and displaying the score
// Source: https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Track_the_score_and_win
function drawScore() {
    "use strict";
    ctx.font = "16px Lato";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(score+" Points", 8, 20);
    ctx.fillText("Lives "+lives, 440, 20);
}
function drawTitle() {
    "use strict";
    ctx.font = "26px Gugi";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Frogger Game", 175, 20);
}

//-------------------------------------------------
// Create Player
//-------------------------------------------------

let Player = function (x,y) {
    "use strict";
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};


// This class requires an update(), render() and a handleInput() method.
Player.prototype.update = function(dt) {
   "use strict";
    //To keep the player on canvas all the time 
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    if (this.y > 400) {
        this.y = 400;
    }
    if (this.y < 0) {
        this.y = 0;
        // Conditions when the player reach the water block
        setTimeout(() => {
            player.reset();
            scoreUpSound.play();
            score += 100;
            if (score >= 1000 && lives >= 2) {
                winningSound.play();
                modal.style.display = "block";
                document.getElementById('title').textContent = `Congratulation you did it !`;
                document.getElementById('emoji').innerHTML = `<img src="images/char-boy.png" alt="player">`;
                document.getElementById('winning').textContent = `You win with ${score} Points and you have ${lives} lives left`;
                musicSound.pause();
                dismissModal();
                } 
            if (score >= 1000 && lives === 1) {
                winningSound.play();
                modal.style.display = "block";
                document.getElementById('title').textContent = `Congratulation you did it !`;
                document.getElementById('emoji').innerHTML = `<img src="images/char-boy.png" alt="player">`;
                document.getElementById('winning').textContent = `You win with ${score} Points and you have ${lives} life left !`;
                dismissModal();
                musicSound.pause();
                }
            }, 100);
    }
};

Player.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Allow the player to move from the key presses eventListener 
Player.prototype.handleInput = function (arrowKeyPress){
    "use strict";
    if (arrowKeyPress == 'right') {
        this.x += 101;
    }

    if (arrowKeyPress == 'left') {
        this.x -= 101;
    }

    if (arrowKeyPress == 'up') {
        this.y -= 84;
    }

    if(arrowKeyPress == 'down') {
        this.y += 84; 
    }

};

//Resetting player's position as soon as hits water or collides with bugs
Player.prototype.reset = function () { 
    "use strict";
    this.x = 200;
    this.y = 400;
};

//-------------------------------------------------
// Create Star 
//-------------------------------------------------

let Star = function (x,y) {
    "use strict";
    this.x = x;
    this.y = y;
    this.sprite = 'images/star.png';
};

// This class requires an update() and a render() method.
Star.prototype.update = function(dt) {
   "use strict";
    //Logic when the player impact the star  
    if (this.x < player.x + 60 &&
    this.x + 60 > player.x &&
    this.y < player.y + 40 &&
    40 + this.y > player.y) {
        //Condition when the player impact the heart 
        scoreUpSound.play();
        score += 50;
        player.reset();
    }
};

Star.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//-------------------------------------------------
// Initiate objects from constructors
//-------------------------------------------------
// Place all enemy objects in an array called allEnemies
let allEnemies = [new Enemy(0, 60, 120), new Enemy(0, 140, 120), new Enemy(0, 225, 120), new Enemy(0, -20, 120)];

// Place the heart in a variable call heart 
let star = new Star(200, -10);

// Place the player object in a variable called player
let player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    musicSound.play();
});

//-------------------------------------------------
// The modal - Source: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
//-------------------------------------------------

function dismissModal () {
    "use strict";
    //Play again button restarts the game and removes the modal
    btn.onclick = function() {
    modal.style.display = "none";
    player.reset();
    score = 0;
    lives = 3;
    }
    
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    player.reset();
    score = 0;
    lives = 3;
    }       

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            player.reset();
            score = 0;
            lives = 3;
        }
    }
}
    // Event Listeners to close the modal and restart the game from the keyboard 
    document.addEventListener("keyup", function(event) {
        if (event.keyCode === 13 || event.keyCode === 27 || event.keyCode === 32) {
            modal.style.display = "none";
            player.reset();
            score = 0;
            lives = 3;
        }
    });

/* Begin Attribution
    // Referenced helper code from Udacity Mentor Carlos.
    // Referenced helper code from Udacity Student Leader Ryan Waite.
End Attribution */