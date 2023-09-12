
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern=[];
var userClickedPattern=[];

var start = false;
var level = 0;

$(document).keypress(function () {
    if (!start) {
            $("#level-title").text("Level " + level);
            nextSequence();
            start = true;
        }
});

$(".btn").click(function () { //eg:-.btn = btn green, btn blue.....
    var userChosenColour = $(this).attr("id"); //store id of button which got clicked
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswers(userClickedPattern.length-1);
});

function checkAnswers(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("#game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press any key to Restart")
        startOver();
    }
}

function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber]; //choose random colour
    gamePattern.push(randomChosenColour);

   //# is used to select "red", ""blue", "green", "yellow" colour with the ID in HTML
    $("#" + randomChosenColour).fadeIn(100).fadeOut(200).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    start = false;
}