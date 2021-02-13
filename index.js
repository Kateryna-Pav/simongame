var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];

var started = false;
var level = 0;


$(document).keypress(function () {
    if (!started) {

        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;
    }
});

// order of functions matter!!!
$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    // saves the id of the clicked button in the array userClickedPattern
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {

        console.log("wrong");
        var audio = new Audio("wrong.mp3");
        audio.play();
        $("body").addClass("game-over")
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game over, Press Any Key to Restart");
        startOver();
    }
    
};

function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

};

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

//plays the sound when button is pressed
function playSound(name) {

    var audio = new Audio(name + ".mp3");
    audio.play();


};

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
};
