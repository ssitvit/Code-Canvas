// Strict Mode
"use strict";
// Constants
const canvas = document.getElementById('canvas');
const gameBar = document.getElementById('mission');
const collection = document.getElementById('collection');
// game start
let start = document.querySelector('.start');
const game_over = document.querySelector('.game-over');
// 2d context
const context = canvas.getContext('2d');
let enemies = [];
let letters = [];
let size;
let gameEnds = false;
let gameWins = false;
let colors = ["#D81B60", "#8E24AA", "#1E88E5", "#00897B", "#43A047", "#C0CA33", "#FDD835",
    "#FFB300", "#F4511E", "#6D4C41", "#e53935", "#6D4C41"];
let words = ["donateme", "github", "itchio", "gameoff", "opensource",
    "canvas", "javascript", "ashiishme", "icantshoot", "ratemeplease"];
let currentWord;
let player;
let maxVelocity = 1.4;
let minVelocity = 0.6;
let maxRadius = 25;
let minRadius = 8;

canvas.width = 1200;
canvas.height = 550;

let player_is_immortal = true;

let keys = {
    up: false, down: false, left: false, right: false,
    w: true, a: true, s: true, d: true
};

setTimeout(make_player_mortal, 5000);

function make_player_mortal() {
    player_is_immortal = false;
}

function getDistance(x1, y1, x2, y2) {
    var xDistance = x2 - x1;
    var yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function get_ud_enemies() {
    let enemies = document.getElementById('enemy_numbers').value;
    return enemies;
}

function set_ud_words() {
    let user_words = document.getElementById('user_words').value;
    if (user_words) {
        let udw_arr = user_words.split(',').map((arr) => { return arr.trim() });
        let temp_arr = [];
        for (let i = 0; i < udw_arr.length; i++) {
            if (udw_arr[i].length <= 12) {
                temp_arr.push(udw_arr[i]);
            }
        }
        words = temp_arr;
    }
}

function get_ud_order() {
    let points_order = document.getElementById('points_order').value;
    if (points_order == 'select') {
        return 'particular';
    }
    return points_order;
}

// Game Objects
const Enemy = function (x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
};

Enemy.prototype = {
    draw: function () {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = "#c62828";
        context.fill();
    },
    update: function () {
        if (this.x + this.dx > canvas.width - this.radius
            || this.x + this.dx < this.radius) {
            this.dx = -this.dx;
        }
        if (this.y + this.dy > canvas.height - this.radius
            || this.y + this.dy < this.radius) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
};

const Letter = function (char, x, y, dx, dy, radius, color) {
    this.char = char;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
};

Letter.prototype = {
    draw: function () {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        context.font = "1em Arial";
        context.fillStyle = "#FFFFFF";
        context.textAlign = "center";
        context.fillText(this.char, this.x, this.y + 5);
    },
    update: function () {
        if (this.x + this.dx > canvas.width - this.radius
            || this.x + this.dx < this.radius) {
            this.dx = -this.dx;
        }
        if (this.y + this.dy > canvas.height - this.radius
            || this.y + this.dy < this.radius) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
};

const Player = function (x, y, angle, size, color) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.ax = 0;
    this.ay = 0;
    this.rv = 0;
    this.angle = angle;
    this.accAmount = 0.04;
    this.dccAmount = 0.02;
    this.friction = 0.9;
    this.rotateSpeed = 0.01;
    this.size = size;
    this.radius = size;
    this.color = color;
};

Player.prototype = {
    accelerate: function (backwards) {
        if (backwards) {
            this.ax -= this.dccAmount;
            this.ay -= this.dccAmount;
        } else {
            this.ax += this.accAmount;
            this.ay += this.accAmount;
        }
    },
    move: function () {
        this.angle += this.rv;
        this.vx += this.ax;
        this.vy += this.ay;
        this.x += this.vx * Math.cos(this.angle);
        this.y += this.vy * Math.sin(this.angle);
        this.ax *= this.friction;
        this.ay *= this.friction;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.rv *= this.friction;
    },
    rotate: function (dir) {
        if (dir === "left") {
            this.rv -= this.rotateSpeed;
        } else if (dir === "right") {
            this.rv += this.rotateSpeed;
        }
    },
    draw: function () {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);
        context.lineWidth = 6;
        context.beginPath();
        context.rect(10, -7, 13, 4);
        context.fillStyle = "#0D47A1";
        context.fill();
        context.beginPath();
        context.arc(this.size / 2, this.size / -2, this.size, 0, Math.PI * 2, false);
        context.strokeStyle = "#0D47A1";
        context.stroke();
        context.fillStyle = "#1565C0";
        context.fill();
        context.closePath();
        context.restore();

    },
    update: function () {
        if (this.x + this.size > canvas.width) {
            this.x = canvas.width - 10;
        }
        if (this.x + this.size < 20) {
            this.x = 10;
        }
        if (this.y + this.size > canvas.height) {
            this.y = canvas.height - 10;
        }
        if (this.y + this.size < 20) {
            this.y = 10;
        }
        this.draw();
    }
};


function genRandomEnemies(ud_enemies) {
    let enemy = 0;
    let default_enemy = 20;
    if (ud_enemies >= 2 && ud_enemies <= 30) { default_enemy = ud_enemies; }
    while (enemy != default_enemy) {
        let radius = Math.random() * (maxRadius - minRadius) + minRadius;
        let x = Math.floor(Math.random() * (canvas.width - radius) + radius);
        let y = Math.floor(Math.random() * (canvas.height - radius) + radius);
        let xVelocity = Math.random() * (maxVelocity - minVelocity) + minVelocity;
        let yVelocity = Math.random() * (maxVelocity - minVelocity) + minVelocity;
        enemies.push(new Enemy(x, y, xVelocity, yVelocity, radius));
        enemy++;
    }
}

let missionLetters = [];

function randomString(str) {
    let letter = 0;
    while (letter < str.length) {
        let x = Math.floor(Math.random() * (canvas.width - 10) + 10);
        let y = Math.floor(Math.random() * (canvas.height - 10) + 10);
        let dx = Math.random() * (maxVelocity - minVelocity) + minVelocity;
        let dy = Math.random() * (maxVelocity - minVelocity) + minVelocity;
        let color = colors[letter];
        letters.push(new Letter(str[letter], x, y, dx, dy, 10, color));
        let li = document.createElement('li');
        li.textContent = str[letter];
        li.style.background = color;
        gameBar.appendChild(li);
        letter++;
    }
}


player = new Player(canvas.width / 2, canvas.height / 2, 0, 10, "#FFF");

function btn_keydown(event) {

    switch (event.keyCode) {

        case 37:
            keys.left = true;
            event.preventDefault();
            break;

        case 38:
            keys.up = true;
            event.preventDefault();
            break;

        case 39:
            keys.right = true;
            event.preventDefault();
            break;

        case 40:
            keys.down = true;
            event.preventDefault();
            break;

        case 87:
            keys.w = true;
            event.preventDefault();
            break;

        case 65:
            keys.a = true;
            event.preventDefault();
            break;

        case 83:
            keys.s = true;
            event.preventDefault();
            break;

        case 68:
            keys.d = true;
            event.preventDefault();
            break;

    }

}

function btn_keyup(event) {

    switch (event.keyCode) {

        case 37:
            keys.left = false;
            event.preventDefault();
            break;

        case 38:
            keys.up = false;
            event.preventDefault();
            break;

        case 39:
            keys.right = false;
            event.preventDefault();
            break;

        case 40:
            keys.down = false;
            event.preventDefault();
            break;

        case 87:
            keys.w = false;
            event.preventDefault();
            break;

        case 65:
            keys.a = false;
            event.preventDefault();
            break;

        case 83:
            keys.s = false;
            event.preventDefault();
            break;

        case 68:
            keys.d = false;
            event.preventDefault();
            break;

    }

}


function collision(enemy, player) {
    if (!player_is_immortal) {
        if (getDistance(enemy.x, enemy.y, player.x, player.y) - enemy.radius * 2 < 0) {
            gameEnds = true;
        }
    }
}

let collectedLetter = [];

function collectLetter(player, letters) {
    if (!player_is_immortal) {
        for (let i = 0; i < letters.length; i++) {
            if (getDistance(player.x, player.y, letters[i].x, letters[i].y) - player.radius * 2 < 0) {
                collectedLetter.push(letters[i]);
                let li = document.createElement('li');
                li.textContent = letters[i].char;
                li.style.background = letters[i].color;
                collection.appendChild(li);
                letters.splice(i, 1);
            }
        }
    }
    if (get_ud_order() == 'particular') {
        if (collectedLetter.length === size) {
            let collectedWord = collectedLetter.map(function (elem) { return elem.char; }).join('');
            if (collectedWord === currentWord) {
                gameWins = true;
            } else {
                gameEnds = true;
            }
        }
    } else if (get_ud_order() == 'random') {
        if (collectedLetter.length === size) {
            gameWins = true;
        }
    }
}

function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    collectLetter(player, letters);
    if (keys.up || keys.w) { player.accelerate(); }
    if (keys.down || keys.s) { player.accelerate(true); }
    if (keys.left || keys.a) { player.rotate("left"); }
    if (keys.right || keys.d) { player.rotate("right"); }
    player.move();
    enemies.forEach(enemy => {
        enemy.update(enemies, letters);
        collision(enemy, player);
    });
    letters.forEach(letter => {
        letter.update();
    });
    player.update();
    if (gameWins) {
        gameWin();
    }
    if (gameEnds) {
        gameOver();
    }
    requestAnimationFrame(update);
}

let gs = document.querySelector('.game-settings');

start.addEventListener('click', () => {
    startGame();
    start.style.display = 'none';
    gs.style.display = 'none';
    keys.w = false;
    keys.a = false;
    keys.s = false;
    keys.d = false;
    document.addEventListener("keydown", btn_keydown, false);
    document.addEventListener("keyup", btn_keyup, false);
});

function startGame() {
    set_ud_words();
    let max = words.length;
    let randomWord = Math.floor(Math.random() * (max - 0) + 0);
    genRandomEnemies(get_ud_enemies());
    randomString(words[randomWord]);
    size = words[randomWord].length;
    currentWord = words[randomWord];
    update();
}

let h1 = document.querySelector('.game-over h1');
let retryBtn = document.querySelector('.game-over button');

function gameWin() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    window.cancelAnimationFrame(update);
    game_over.style.display = 'block';
    h1.textContent = "Yay!!! Winner Winner Chicken Dinner";
    retryBtn.textContent = "Play Again!!";
}

function gameOver() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    window.cancelAnimationFrame(update);
    game_over.style.display = 'block';
    h1.textContent = "Game Over";
    retryBtn.textContent = "Let Me Try Once Again!!";
}