
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;


$(document).keydown(function() {
    if (!started) {  
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    //console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        // Check if they have finished inputting the pattern
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        // Restart Game
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout (function() {
            $("body").removeClass("game-over")
        }, 200);

        startOver();
    }
}


function nextSequence() {
    userClickedPattern = [];
    level += 1;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    
    // Animate a flash, play a sound
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout (function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}