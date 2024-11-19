const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

$(document).keypress(() => {
    if (!started) {
        $("#level-title").text(`Poziom ${level}`);
        nextSequence();
        started = true;
    }
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text(`Poziom ${level}`);
    
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $(`.${randomChosenColor}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

$(".zse").click(function () {
    const userChosenColor = $(this).attr("class").split(' ')[1];
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Przegrałeś! Naciśnij dowolny klawisz, aby spróbować ponownie.");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function animatePress(currentColor) {
    $(`.${currentColor}`).addClass("pressed");
    setTimeout(() => {
        $(`.${currentColor}`).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    const audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}
