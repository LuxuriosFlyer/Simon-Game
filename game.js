let gamePattern = [];
let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let gameStatus = false;
let lvl = 0;
let i = 0;

function nextSequence(){
    let randomNumber = Math.floor((Math.random()*4));

    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    let audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();

    lvl++;

    $("#level-indicator").text("Level "+lvl);
    
    i=0;
}

$(".btn").on("click", function(){
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userChosenColour);
    i++;
});

function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass('pressed');
    }, 100);
}

$(document).on("keypress", function(){
    if(gameStatus==false){
        gameStatus= true;
        nextSequence();
    }
});

function checkAnswer(recentColour){
    console.log(recentColour);
    console.log(gamePattern[i]);
    if(recentColour == gamePattern[i]){
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(nextSequence, 1000);
            userClickedPattern=[];
        }
    }
    else{
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);

        $("#level-indicator").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver(){
    lvl=0;
    gamePattern = [];
    gameStatus = false;
    i=0;
}