var buttonColors = ["red","blue","green","yellow"];
var gamePattern = []; //empty array 
var userClickedPattern = [] //Another empty array;

//2. Create a new variable called level and start at level 0.
var level = 0; 

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var starter = false;

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function(){
    if(!starter) {
        //If !starter if keypress is true change the title to Level 0 and call next sequence;
        $("#title").text("Level " + level);
        nextSequence();
        //Once next sequence ends gameplay end starter should be true; Starter being true will trigger the beginning again
        starter = true;
    }
});

//Get the color user clicks and set to a new var userChosenColor;
$(".btn").on("click",function() {
    var userChosenColor = this.id;
    //console.log(userChosenColor);

    // Add the contents of the variable userChosenColour created to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColor);
    // console.log("This is userClickedPattern " + userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence () {
    level++;

    //5. Inside nextSequence(), update the h1 with this change in the value of level.
    $("#title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 3) + 1;
    // console.log(randomNumber);
    //Get a random number[] or color from the list of array buttonColors 
    var randomChosenColor = buttonColors[randomNumber];
    
    gamePattern.push(randomChosenColor);
    //console.log(gamePattern);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    // var randomChosenSound = new Audio("sounds/" + randomChosenColor + ".mp3");
    playSound(randomChosenColor);
    
}

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");

      //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
      playSound("wrong");

      //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
      $("#title").text("Game Over, Press Any Key to Restart");

      //2. Call startOver() if the user gets the sequence wrong.
      startOver();
    }

}

//Function that plays only sound; 
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//another function for animation click;
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

//1. Create a new function called startOver().
function startOver() {

    //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    starter = false;
  }


