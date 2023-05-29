

/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = '🎉 Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/
'use strict';
let highscore=0;
const secretNumber = Math.trunc(Math.random() * 20)+1;
let score = 20;
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

//when no input
if(!guess){
  document.querySelector('.message').textContent = 'No number!';
} 
//when player wins
else if(guess===secretNumber){

  document.querySelector('.message').textContent = '🎉 Correct Number!';
  document.querySelector('body').style.backgroundColor= '#008000';
  document.querySelector('.number').style.width= '30rem';
  if(score>highscore){
    highscore=score;
    document.querySelector('.highscore').textContent= highscore;
  }
}
//when guess is too high
else if(guess!==secretNumber){
  if(score>1){
    if(guess<secretNumber){
      document.querySelector('.message').textContent = 'Too Low!';
    }  
    else{
      document.querySelector('.message').textContent = 'Too High';
    }  
    score--;
    document.querySelector('.score').textContent=score;
      }
    else{
      document.querySelector('.message').textContent= 'you lost';
      document.querySelector('.score').textContent=0;
    }
}
})
/*else if(guess>secretNumber){
  if(score>1){
  document.querySelector('.message').textContent = 'Too high!';
  score--;
  document.querySelector('.score').textContent=score;
    }
  else{
    document.querySelector('.message').textContent= 'you lost';
  }
}
//when guess is too low

else if(guess<secretNumber){
  if(score>1){
  document.querySelector('.message').textContent = 'Too Low!';
  score--;
  document.querySelector('.score').textContent=score;
}
else{
  document.querySelector('.message').textContent= 'you lost';
  }
}*/ 
document.querySelector('.again').addEventListener('click', function(){
  score=20;
  const secretNumber = Math.trunc(Math.random() * 20)+1;
  document.querySelector('.message').textContent = 'Start Guessing';
  document.querySelector('.score').textContent=score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value='';
  document.querySelector('body').style.backgroundColor= '#222';
  document.querySelector('.number').style.width= '15rem';
})
