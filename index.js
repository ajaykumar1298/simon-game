let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
var started = false;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text(`level ${level}`);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");

  setTimeout(() => {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

$(".btn").on("click", (e) => {
  let userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).on("keypress", () => {
  if (!started) {
    started = true;
    $(`#level-title`).text("Level " + level);
    nextSequence();
  }
});
