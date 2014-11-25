/**
 * @fileoverview This is the core application file for a clone of the classic
 * arcade game, Frogger.
 * @author David Wilkie
 * @since 24 November, 2014
 * @copyright Copyright (c) 2014, David Wilkie
 */

/**
 * Enemies our player must avoid.
 * @constructor
 */ 
var Enemy = function() {
    /** 
     * The path to an image/sprite for our enemies. 
     * @type {string}
     */
    this.sprite = 'images/enemy-bug.png';
    /**
     * X coordinate.
     * @type {number}
     */
    this.x = 0;
    /**
     * Y coordinate.
     * @type {number}
     */
    this.y = 0;
    /** 
     * Randomly set enemy speed.
     * @type {number}
     */
    this.speed = Math.floor(Math.random() * 250) + 100;
};

/** Updates the enemy's position, required method for game.
 * @parameter {number} dt This is a time delta between ticks.
 */
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 600) { 
        this.reset()
    }
};

/** 
 * Draws the enemy on the screen, required method for game.
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/** 
 * Moves the enemy back to the beginning of the path and randomize its speed.
 */
Enemy.prototype.reset = function() {
    this.x = -50;
    this.y = 83 * (Math.floor(Math.random() * 3)) + 60;
    this.speed = Math.floor(Math.random() * 250) + 100;
};

/**
 * Returns coordinates of this enemy.
 *
 * @return {array} The x y coords.
 */
Enemy.prototype.getCoords = function() {
    coords = [this.x, this.y];
    return coords;
};

/** 
 * Player class.
 * @constructor
 */
var Player = function() {
    /** 
     * The path to an image/sprite for our player. 
     * @type {string}
     */
    this.sprite = 'images/char-boy.png';
    /**
     * X coordinate.
     * @type {number}
     */
    this.x = 0;
    /**
     * Y coordinate.
     * @type {number}
     */
};

/** 
 * Upon reaching the other side, moves player to start (with a reset).
 * @parameter {number} dt This is a time delta between ticks.
 */
Player.prototype.update = function(dt) {
    if (this.y < 83) {
        this.reset();
    }
};

/**
 * Makes a call to the ctx class to render the player.
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/** 
 * Moves the player to the starting position.
 */
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 332;
};

/**
 * Controls player movement.
 * @parameter {number} keyCode The ASCII number of the key pressed.
 */
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
};

/** Listens for key presses and sends the keys to the Player.handleInput()
 *  method.
 */ 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/** 
 * Instantiates objects, places all enemy objects in an array called allEnemies,
 * and places the player object in a variable called player
 */
player = new Player;
allEnemies = [];
for (var i=0;i<6;i++) {
    e = new Enemy;
    e.x = Math.random() * 450;
    e.y = 83 * (Math.floor(Math.random() * 3)) + 60;
    allEnemies.push(e);
};
