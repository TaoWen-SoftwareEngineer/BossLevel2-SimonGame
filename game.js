var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gameStart = false;
var level = 0;

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  if(userClickedPattern.length==gamePattern.length){
    checkAnswer(userClickedPattern.length - 1);
  }

});

$(document).keypress(function(event) {
  if (gameStart == false) {

    nextSequence();
    gameStart = true;
  }
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed"); //your code to be executed after 1 second
  }, 100);
}

function checkAnswer(currentLevel) {
  var resetFlag=false;
  for(var i=0;i<gamePattern.length;i++){
    if(userClickedPattern[i] !== gamePattern[i]) {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over"); //your code to be executed after 1 second
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      resetFlag=true;
      startOver();
    }
  }
  if(resetFlag==false){
    setTimeout(function(){
      nextSequence();
      userClickedPattern=[];
    },1000);
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStart = false;
  userClickedPattern=[];
}
