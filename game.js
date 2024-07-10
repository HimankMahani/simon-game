var gamePattern = []
var userClickedPattern = []
var level = 0;
var started = false;

var buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playaudio(randomChosenColour);
    level++;
    $("h1").text("Level " + level);
};

$('.btn').click(function(){
    if(started===true){
        var userChosenColour = $(this).attr('id');
        userClickedPattern.push(userChosenColour);
        playaudio(userChosenColour);
        animatePress(userChosenColour);
        checkanswer(userClickedPattern.length -1);
    }
})

function playaudio(color){
    var audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

document.addEventListener("keydown",function(){
    if(started === false){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

function checkanswer(currentLevel){
    if(userClickedPattern[currentLevel]=== gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()  
            },1000);
        }
    } else {
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over")
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart")

        startover()
    }
    
}

function startover(){
    level = 0;
    gamePattern = [];
    started = false
}