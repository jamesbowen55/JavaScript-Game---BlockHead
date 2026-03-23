// Gets random integer used to update obstacle
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Updates obstacle based on a random integer from 1 to 3
function updateObstacle(num){
    if(num == 1){
        document.querySelector(".obstacle").style.backgroundImage = "url('Images/Triangle1.jpg')";
        document.querySelector(".obstacle").style.backgroundSize = "50px";
        document.querySelector(".obstacle").style.height = "50px";
        document.querySelector(".obstacle").style.width = "50px";
    }
    if(num == 2){
        document.querySelector(".obstacle").style.backgroundImage = "url('Images/Triangle2.jpg')";
        document.querySelector(".obstacle").style.backgroundSize = "30px";
        document.querySelector(".obstacle").style.height = "90px";
        document.querySelector(".obstacle").style.width = "30px";
    }
    if(num == 3){
        document.querySelector(".obstacle").style.backgroundImage = "url('Images/Triangle3.jpg')";
        document.querySelector(".obstacle").style.backgroundSize = "70px";
        document.querySelector(".obstacle").style.height = "30px";
        document.querySelector(".obstacle").style.width = "70px";
    }
}

// Updates the speed of the obstacles based on how high the score is
function updateSpeed(score){
    // second level
    if(score >= 10 && score < 20){
        document.querySelector(".obstacle").style.animation = "obstacle 2s linear infinite";
        document.getElementById("level").innerHTML = "Harder"
    }
    // third level
    if(score >= 20){
        document.querySelector(".obstacle").style.animation = "obstacle 1.5s linear infinite";
        document.getElementById("level").innerHTML = "Hardest"
    }
}

// Runs game when the intro screen is clicked
function startGame(){
    let intro = {};
    intro = document.getElementById("intro");
    intro.style.display = "none";
    let game = {};
    game = document.getElementById("container");
    game.style.display = "block";

    // character position property
    let char = {};
    char = document.getElementById("character").getBoundingClientRect();
    // obstacle position property
    let obst = {};
    obst = document.querySelector(".obstacle").getBoundingClientRect();
    // container position property
    let container = {};
    container = document.getElementById("container").getBoundingClientRect();
    let score = 0;
    // character properties
    let charProp = {};
    charProp.elem = document.getElementById("character");
    charProp.jumpHeight = 0;
    charProp.maxJump = 180;
    charProp.jumping = false;
    charProp.falling = false;
    charProp.maxHang = 10;
    charProp.hangTime = 0;
    charProp.jumpLock = false; 
    charProp.jumpedOver = false;

    // Main loop that checks if the player has collided with an obstacle and updates score
    setInterval(() => {
        char = document.getElementById("character").getBoundingClientRect();
        obst = document.querySelector(".obstacle").getBoundingClientRect();
        console.log(obst.x);
        if(char.right < obst.x && charProp.jumpedOver == true){
            charProp.jumpedOver = false
        }
        if(char.right > obst.x && char.bottom > obst.y && obst.x >= 160){
            document.getElementById("character").style.backgroundImage = "url('Images/Block_Head_Dead.jpg')";
            document.querySelector(".obstacle").style.animation = "none";
            document.getElementById("gameOver").style.display = "grid";
        }
        else if(obst.x < container.x && charProp.jumpedOver == false){
            score += 1;
            document.getElementById("score").innerHTML = `Score: ${score}`;
            let randNum = getRandomInt(1, 3);
            updateObstacle(randNum);
            updateSpeed(score);
            charProp.jumpedOver = true   }
    }, 80)

    // checks if space has been pressed and jumps if true
    document.addEventListener("keydown", e=> {
        if(e.code === "Space"){
            if(charProp.jumpLock == false){
                jumping();
            }
        }
    })
    
    function jumping(){
        charProp.jumpLock = true;
        charProp.jumping = true;
        let jump = setInterval(() => {
            // going up
            if(charProp.jumpHeight < charProp.maxJump && charProp.jumping == true){
                charProp.jumpHeight += 10;
            }
            // top of jump
            else if(charProp.jumpHeight >= charProp.maxJump && charProp.jumping == true){
                charProp.jumping = false;
            }
            // hang time
            else if(charProp.jumping == false && charProp.hangTime < charProp.maxHang && charProp.falling == false){
                charProp.jumpHeight = charProp.maxJump;
                charProp.hangTime += 1;
            }
            // falling
            else if(charProp.jumpHeight > 0 && charProp.jumping == false && charProp.hangTime >= charProp.maxHang){
                charProp.falling = true;
                charProp.jumpHeight -= 10;
            }
            // at bottom?
            else{
                charProp.falling = false;
                charProp.hangTime = 0;
                charProp.jumpLock = false;
                clearInterval(jump);
            }
            charProp.elem.style.bottom = `${charProp.jumpHeight}px`;
        }, 30)
    }
}