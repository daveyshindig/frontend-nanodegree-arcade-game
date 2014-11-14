// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 0;
    this.speed = Math.floor(Math.random() * 250) + 100;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 600) { 
        this.reset()
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Move the enemy back to the beginning of the path and randomize its speed
Enemy.prototype.reset = function() {
    this.x = -50;
    this.y = 83 * (Math.floor(Math.random() * 3)) + 60;
    this.speed = Math.floor(Math.random() * 250) + 100;
}

Enemy.prototype.getCoords = function() {
    coords = [this.x, this.y];
    return coords;
}

// Player class
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202; 
    this.y = 332; 
}

// Upon reaching the other side, move player to start (with a reset)
Player.prototype.update = function(dt) {
    if (this.y < 83) {
        this.reset();
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Move the player to the starting position
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 332;
}

// Controls player movement
Player.prototype.handleInput= function(keyCode) {
    if (keyCode == 'left') { 
        if (player.x >= 101) {
            player.x -= 101;
        }
    } 
    else if (keyCode == 'up') { 
        if (player.y >= 83) {
            player.y -= 83;
        } 
    }
    else if (keyCode == 'right') { 
        if (player.x <= 303) {
            player.x += 101;
        } 
    }
    else if (keyCode == 'down') { 
        if (player.y <= 332) {
            player.y += 83;
        } 
    }
}

// Instantiates objects.
// Places all enemy objects in an array called allEnemies
// Places the player object in a variable called player
player = new Player;
allEnemies = [];
for (var i=0;i<6;i++) {
    e = new Enemy;
    e.x = Math.random() * 450;
    e.y = 83 * (Math.floor(Math.random() * 3)) + 60;
    allEnemies.push(e);
}

// This listens for key presses and sends the keys to the
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
