//playarea
var size_of_block = 25;
var rows = 20;
var cols = 20;
var playarea;
var context;

window.onload = function() {
    playarea = document.getElementById("playarea");
    playarea.height = rows * size_of_block;
    playarea.width = cols * size_of_block;
    context = playarea.getContext("2d");
    placeFood();
    document.addEventListener("keyup", control);
    setInterval(update, 1000/10);
}

//snake's body
var snakeBody = [];

//snake's head 
var x_snake= size_of_block * 5;
var y_snake= size_of_block * 5;

//food for snake
var x_food = size_of_block*10;
var y_food = size_of_block*10;

//speed
var x_speed = 0;
var y_speed = 0;

//gameover
var gameOver = false;

//playarea
function update(){
    if (gameOver) {
        return;
    }

    context.fillStyle = "#6bbd99";
    context.fillRect(0, 0, playarea.width, playarea.height);

    context.fillStyle = "#f54768";
    context.fillRect(x_food, y_food, size_of_block, size_of_block);

    if(x_snake == x_food && y_snake == y_food){
        snakeBody.push([x_food, y_food])
        placeFood();
    }

    for(let i = snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }

    if(snakeBody.length) {
        snakeBody[0] = [x_snake, y_snake];
    }
    context.fillStyle = "#0295a9";
    x_snake += x_speed * size_of_block ;
    y_snake += y_speed * size_of_block ;

    context.fillRect(x_snake, y_snake, size_of_block, size_of_block);

    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], size_of_block, size_of_block);
    }

    //
    if(x_snake < 0 || x_snake > cols*size_of_block || y_snake < 0 || y_snake > cols*size_of_block)
    {
        gameOver = true;
        alert("Game Over!");
    }

    for(let i = 0; i<snakeBody.length; i++){
        if(x_snake == snakeBody[i][0] && y_snake == snakeBody[i][1]){
            gameOver = true;
            alert("Game Over!");
        }
    }
}

function placeFood() {
    x_food = Math.floor(Math.random()*cols)*size_of_block;
    y_food = Math.floor(Math.random()*rows)*size_of_block;
}

//controls of snake
function control(e) {
    if(e.code=="ArrowUp" && y_speed != 1){
        x_speed = 0;
        y_speed = -1;
    }    
    else if(e.code=="ArrowDown" && y_speed != -1){
        x_speed = 0;
        y_speed = 1;
    }    
    else if(e.code=="ArrowRight" && x_speed != -1){
        x_speed = 1;
        y_speed = 0;
    }    
    else if(e.code=="ArrowLeft" && x_speed != 1){
        x_speed = -1;
        y_speed = 0;
    }
}
