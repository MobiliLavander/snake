
// the snake is divided into small segments, which are drawn and edited on each 'draw' call
let numSegments = 2;
let direction = 'right';

const xStart = 0; //starting x coordinate for snake
const yStart = 250; //starting y coordinate for snake
const diff = 10;

let xCor = [];
let yCor = [];

let xFruit = 0;
let yFruit = 0;
let scoreElem, highScoreElem;

let score = 0, highScore = 0;

let oscillator, playing = false;

let gamerName;


function setup() {
    scoreElem = createDiv('Score: ' + score);
    scoreElem.id('score');

    highScoreElem = createDiv('High Score: ...');
    highScoreElem.id('highScore');

    database.on("value", function (snapshot) {
        if (snapshot.val()) {
            highScore = snapshot.val().score;
            console.log(highScore);
            highScoreElem.html('High Score: ' + highScore + " (" + snapshot.val().name + ")");
        } else {
            highScoreElem.html('High Score: ' + highScore);
        }

    });

    createCanvas(800, 600);

    frameRate(15);
    stroke(255);
    strokeWeight(10);
    updateFruitCoordinates();

    for (let i = 0; i < numSegments; i++) {
        xCor.push(xStart + i * diff);
        yCor.push(yStart);
    }

    oscillator = new p5.Oscillator('sine');
    oscillator.freq(261.63, 0.1);
    oscillator.amp(0);


}

function draw() {
    background(0);
    for (let i = 0; i < numSegments - 1; i++) {
        line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]);
    }
    updateSnakeCoordinates();
    checkGameStatus();
    checkForFruit();

    if (playing) {
        // smooth the transitions by 0.1 seconds
        oscillator.freq(261.63, 0.1);
        oscillator.amp(0.6, 0.1);
    }
}

function updateSnakeCoordinates() {
    for (let i = 0; i < numSegments - 1; i++) {
        xCor[i] = xCor[i + 1];
        yCor[i] = yCor[i + 1];
    }
    switch (direction) {
        case 'right':
            xCor[numSegments - 1] = xCor[numSegments - 2] + diff;
            yCor[numSegments - 1] = yCor[numSegments - 2];
            break;
        case 'up':
            xCor[numSegments - 1] = xCor[numSegments - 2];
            yCor[numSegments - 1] = yCor[numSegments - 2] - diff;
            break;
        case 'left':
            xCor[numSegments - 1] = xCor[numSegments - 2] - diff;
            yCor[numSegments - 1] = yCor[numSegments - 2];
            break;
        case 'down':
            xCor[numSegments - 1] = xCor[numSegments - 2];
            yCor[numSegments - 1] = yCor[numSegments - 2] + diff;
            break;
    }
}


function checkGameStatus() {
    if (
        xCor[xCor.length - 1] > width ||
        xCor[xCor.length - 1] < 0 ||
        yCor[yCor.length - 1] > height ||
        yCor[yCor.length - 1] < 0 ||
        checkSnakeCollision()
    ) {
        noLoop();
        gameOver();
    }
}

function gameOver() {
    scoreElem.html('Game over! Your score was ' + score);
    scoreElem.class('gameover');
    highScoreElem.hide();
    playOscillator();


    if (score > highScore) {
        gamerName = prompt("New high score! 🏅\nPlease enter your name:", "");
        if (gamerName == null || gamerName == "") {
            gamerName = "John Doe";
        }
        submitHighScore(gamerName, score);
    }
}


function checkSnakeCollision() {
    const snakeHeadX = xCor[xCor.length - 1];
    const snakeHeadY = yCor[yCor.length - 1];
    for (let i = 0; i < xCor.length - 1; i++) {
        if (xCor[i] === snakeHeadX && yCor[i] === snakeHeadY) {
            return true;
        }
    }
}

function checkForFruit() {
    point(xFruit, yFruit);
    if (xCor[xCor.length - 1] === xFruit && yCor[yCor.length - 1] === yFruit) {
        scoreElem.html('Score: ' + (++score));
        xCor.unshift(xCor[0]);
        yCor.unshift(yCor[0]);
        numSegments++;
        playOscillator();
        updateFruitCoordinates();
    }
}

function updateFruitCoordinates() {

    xFruit = floor(random(10, (width - 100) / 10)) * 10;
    yFruit = floor(random(10, (height - 100) / 10)) * 10;
}

function keyPressed() {
    switch (keyCode) {
        case 37:
        case 65:
            if (direction !== 'right') {
                direction = 'left';
            }
            break;
        case 39:
        case 68:
            if (direction !== 'left') {
                direction = 'right';
            }
            break;
        case 38:
        case 87:
            if (direction !== 'down') {
                direction = 'up';
            }
            break;
        case 40:
        case 83:
            if (direction !== 'up') {
                direction = 'down';
            }
            break;
    }
}

function playOscillator() {
    // starting an oscillator on a user gesture will enable audio
    // in browsers that have a strict autoplay policy.
    // See also: userStartAudio();
    oscillator.start();
    playing = true;

    setTimeout(function () { stopOscillator(); }, 10);
}

function stopOscillator() {
    // ramp amplitude to 0 over 0.5 seconds
    oscillator.amp(0, 0.5);
    playing = false;
}

function windowResized() {
    // resizeCanvas(windowWidth, windowHeight);
}
