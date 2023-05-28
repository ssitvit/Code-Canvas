const score1 = document.querySelector("#score1"); //the span element
const score2 = document.querySelector("#score2"); //the span element
const playTo = document.querySelector("#maxScoreSelect");
const heading = document.querySelector("#heading");
const custom = document.querySelector("#addNames");
const btn1 = document.querySelector("#btn1");
const btn2 = document.querySelector("#btn2");
const reset = document.querySelector("#reset");

let p1Name = "";
let p2Name = "";

let maxScore = parseInt(playTo.value);
let p1Score = 0;
let p2Score = 0; //actual scores
let isGameOver = false;

// console.log(maxScore);

playTo.addEventListener("change", function () {
  maxScore = parseInt(this.value);
  //   alert(maxScore);
  resetGame();
});

btn1.addEventListener("click", () => {
  // alert("clicked");
  if (!isGameOver) {
    p1Score++;
    score1.textContent = p1Score;
    if (p1Score === maxScore) {
      isGameOver = true;
      score1.classList.add("winner");
      score2.classList.add("loser");
      if (p1Name === "") heading.textContent = "Player 1 wins!!!";
      else heading.textContent = `${p1Name} wins!!!`;
      btn1.disabled = true;
      btn2.disabled = true;
      custom.disabled = true;
      btn1.classList.add("disabled");
      btn2.classList.add("disabled");
      custom.classList.add("disabled");
    }
  }
});

btn2.addEventListener("click", () => {
  // alert("clicked");
  if (!isGameOver) {
    p2Score++;
    score2.textContent = p2Score;
    if (p2Score === maxScore) {
      isGameOver = true;
      score2.classList.add("winner");
      score1.classList.add("loser");
      if (p2Name === "") heading.textContent = "Player 2 wins!!!";
      else heading.textContent = `${p2Name} wins!!!`;
      btn1.disabled = true;
      btn2.disabled = true;
      custom.disabled = true;
      btn1.classList.add("disabled");
      btn2.classList.add("disabled");
      custom.classList.add("disabled");
    }
  }
});

reset.addEventListener("click", resetGame);

function resetGame() {
  isGameOver = false;
  p1Score = 0;
  p2Score = 0;
  score1.textContent = "0";
  score2.textContent = "0";
  score1.classList.remove("winner", "loser");
  score2.classList.remove("winner", "loser");
  heading.textContent = "Ping Pong Score Keeper";

  btn1.classList.remove("disabled");
  btn2.classList.remove("disabled");
  custom.classList.remove("disabled");

  btn1.disabled = false;
  btn2.disabled = false;
  custom.disabled = false;
  p1Name = "";
  p2Name = "";
  btn1.textContent = "+1 Player 1";
  btn2.textContent = "+1 Player 2";
}

custom.addEventListener("click", () => {
  p1Name = prompt("Enter name of first player");
  p2Name = prompt("Enter name of second player");
  if (p1Name) btn1.textContent = `+1 ${p1Name}`;
  else btn1.textContent = "+1 Player 1";

  if (p2Name) btn2.textContent = `+1 ${p2Name}`;
  else btn2.textContent = "+1 Player 2";
});
