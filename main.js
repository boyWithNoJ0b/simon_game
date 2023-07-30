
// this button colors can represent html element bcus they match its ID and CLASS
const buttonColors = ["red", "blue", "green", "yellow"]; // the colors of buttons

let gamePattern = [];
let userClickedPattern = [];

let level = 0;


const startGame = () => {
    let onlyOnce = 0;
    $(document).keydown(function() {
        if(onlyOnce == 0){
            nextSequence();
        }
        onlyOnce++;
    })
}

// FUNCTION IS FOR CREATE A RANDOM COLOR TO PICK AND ADD IT IN 'gamePattern' ARRAY
const nextSequence = () => { 
    let randomNumber = Math.floor(Math.random()*4);
    let randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);

    animateClick(randomChoosenColor);

    playSound(randomChoosenColor);

    $("#level-title").html(`Level ${level}`); // starting from level 0
    level++; // increase level by 1 after this function is called

    userClickedPattern = []; // emptying this array for next level
}


// THIS FUNCTION IS FOR DETECT WHICH BUTTON IS CLICKED BY A USER AND ADD ITS COLOR NAME TO 'userClickedPattern' ARRAY
const userSequence = () => {
    $(".btn").click(function(event){
        let userChoosenColor = event.target.id;
        userClickedPattern.push(userChoosenColor);
        animateClick(userChoosenColor);
        playSound(userChoosenColor);

        checkAnswer(userClickedPattern.length -1);
    })    
}



// function is for animate button clicks and it's called in nextSequence()
const animateClick = (btnColor) => {
    let myButtonById = $(`#${btnColor}`);

    myButtonById.animate(
        {"opacity": "0"}, 120
    );
    myButtonById.animate(
        {"opacity": "1"}, 120
    );

    myButtonById.addClass("pressed");

    setTimeout(function(){
        myButtonById.removeClass("pressed");
    }, 120)
}



// this function is for play sounds when button is clicked,
// we need to pass the name of the color to play that sound.
const playSound = (buttonColor) => {
    let blue = new Audio("./sounds/blue.mp3");
    let green = new Audio("./sounds/green.mp3");
    let red = new Audio("./sounds/red.mp3");
    let wrong = new Audio("./sounds/wrong.mp3");
    let yellow = new Audio("./sounds/yellow.mp3");
    switch(buttonColor) {
        case "blue":
            blue.play()
            break
        case "green":
            green.play()
            break
        case "red":
            red.play()
            break
        case "yellow":
            yellow.play()
            break
        case "wrong":
            wrong.play()
            break
        default:
            throw new Error(buttonColor + " --- this name of case is not defined in switch statement in playSound() function")
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    startGame();
}


const checkAnswer = (currentLevel) => {

    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){


        if(gamePattern.length == userClickedPattern.length){


            setTimeout(function(){
                nextSequence();
            }, 1000)
        }

    } else {

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over")
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }

}



function mainFunction() {
    userSequence();

    
}



mainFunction();
startGame();




