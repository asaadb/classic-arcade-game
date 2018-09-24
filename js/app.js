// Enemies our player must avoid
var Enemy = function(x, y, speed) {
  // Variables applied to each of our instances go here,
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.height = 50;
  this.width = 50;
  // The image/sprite for our enemies, this uses
  // a helper to easily load images
  this.sprite = "images/enemy-bug.png";
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should any movement is multipled by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  //if enemy reaches the end of the screen, start over again
  if (this.x > 485) {
    this.x = -100;
    this.speed = randomSpeed();
  }
  //update the location based on the speed
  this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.render;

//player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = "images/char-boy.png";
  this.height = 50;
  this.width = 50;
};
Player.prototype.update = function() {
  //if the player reaches the water, you start from the begining.
  if (this.y === -32) {
    this.y = 383;
    this.x = 200;
  }
  checkBug(this);
};
// Draw the Player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  switch (key) {
    case "up":
      //check if the player reached the top limits
      if (this.y > -32) {
        this.y -= 83;
      }
      break;
    case "down":
      //check if the player reached the bottom limits
      if (this.y < 383) {
        this.y += 83;
      }
      break;
    case "right":
      //check if the player reached the right limits
      if (this.x < 402) {
        this.x += 101;
      }
      break;
    case "left":
      //check if the player reached the left limits
      if (this.x > -2) {
        this.x -= 101;
      }
      break;
  }
};

Player.prototype.render;
// instantiate all objects.
// all enemy objects are placed in an array called allEnemies
// the player object is placed in a variable called player
let BugEnemy1 = new Enemy(0, 63, randomSpeed());
let BugEnemy2 = new Enemy(0, 147, randomSpeed());
let BugEnemy3 = new Enemy(0, 230, randomSpeed());
let allEnemies = [BugEnemy1, BugEnemy2, BugEnemy3];
let player = new Player(200, 383);
//generate random speed
function randomSpeed() {
  return Math.floor(Math.random() * (400 - 100 + 1)) + 100;
}
//check two objects for collision
function checkCollision(player, enemy) {
  if (
    player.x < enemy.x + enemy.width &&
    player.x + player.width > enemy.x &&
    player.y < enemy.y + enemy.height &&
    player.y + player.height > enemy.y
  ) {
    // The objects are touching
    player.y = 383;
    player.x = 200;
  }
}

function checkBug(player) {
  for (const enemyObject of allEnemies) {
    checkCollision(player, enemyObject);
  }
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
  var allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
