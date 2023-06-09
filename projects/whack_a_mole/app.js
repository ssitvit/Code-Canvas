const startBtn = document.querySelector(".startBtn");
const resetBtn = document.querySelector(".resetBtn");
const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const scoreBoard = document.querySelector(".scoreBoard");
let lastHole;
let score = 0;
let timeUp = false;

function startGame(){
    popOutMoles();
    setTimeout(() => {
        timeUp = true;
        resetBtn.removeAttribute("disabled");
    }, 10000);
    startBtn.setAttribute("disabled",true);
    resetBtn.setAttribute("disabled",true);
}

function resetGame(){
    startBtn.removeAttribute("disabled");
    timeUp = false;
    score = 0;
    scoreBoard.textContent = score;
}

function popOutMoles(){
    const time = getRandomTime(300,1500);
    const hole = getRandomHole();
    const mole = hole.children[0];
    mole.classList.add('moleUp');
    setTimeout(() => {
        mole.classList.remove('moleUp');
        if(!timeUp) popOutMoles();
    }, time);

}

function hitTheMole(e){
    if(!e.isTrusted) return;
    score++;
    this.classList.remove('moleUp');
    scoreBoard.textContent = score;
}

function getRandomTime(min,max){
    return Math.round(Math.random() * (max-min) + min);
}

function getRandomHole(){
    const holeIdx = Math.floor(Math.random() * holes.length);
    const hole = holes[holeIdx];
    if(hole === lastHole){
        return getRandomHole();
    }
    lastHole = hole;
    return hole;
}

moles.forEach(mole => mole.addEventListener("click",hitTheMole));
startBtn.addEventListener("click",startGame);
resetBtn.addEventListener("click",resetGame);