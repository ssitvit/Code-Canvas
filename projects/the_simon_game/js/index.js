// variable declarations
var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Adds keypress event to start the game
$(document).keypress(function (event) {
  var key = event.key;
  if (!started && (key === 'A' || key === 'a')) {
    $('#level-title').text('Level ' + level);
    nextSequence();
    started = true;
  }
});

// Handles click events, records user's pattern, plays sound, animations and checks the pattern.
$('.btn').click(function () {
  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  // console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// function to generate the game pattern
function nextSequence() {
  userClickedPattern = [];
  level++;
  $('#level-title').text('Level ' + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $('#' + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

// function to check the user's pattern against the game pattern
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log('Success');

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound('wrong');
    $('body').addClass('game-over');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);

    $('#level-title').text('Game Over,Press A Key to Restart');
    startOver();
    // console.log("wrong");
  }
}

// function to restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// function to play sound
function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

// function to highlight/flash/animate the boxes
function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed');
  setTimeout(function () {
    $('#' + currentColor).removeClass('pressed');
  }, 100);
}
