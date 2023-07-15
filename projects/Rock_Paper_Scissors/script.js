// Get DOM elements
const gameContainer = document.querySelector(".container");
const userResult = document.querySelector(".user_result img");
const cpuResult = document.querySelector(".cpu_result img");
const result = document.querySelector(".result");
const optionImages = document.querySelectorAll(".option_image");
const userScore = document.querySelector(".user-score span");
const cpuScore = document.querySelector(".cpu-score span");
const drawScore = document.querySelector(".draw-score span");

let score = {
  user: 0,
  cpu: 0,
  draw: 0
};

// Update scoreboard function
const updateScoreboard = () => {
  userScore.textContent = score.user;
  cpuScore.textContent = score.cpu;
  drawScore.textContent = score.draw;
};

// Loop through each option image element
optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    image.classList.add("active");

    userResult.src = cpuResult.src = "images/rock.png";
    result.textContent = "Wait...";

    optionImages.forEach((image2, index2) => {
      index !== index2 && image2.classList.remove("active");
    });

    gameContainer.classList.add("start");

    let time = setTimeout(() => {
      gameContainer.classList.remove("start");

      let imageSrc = e.target.querySelector("img").src;
      userResult.src = imageSrc;

      let randomNumber = Math.floor(Math.random() * 3);
      let cpuImages = ["images/rock.png", "images/paper.png", "images/scissors.png"];
      cpuResult.src = cpuImages[randomNumber];

      let cpuValue = ["R", "P", "S"][randomNumber];
      let userValue = ["R", "P", "S"][index];

      let outcomes = {
        RR: "Draw",
        RP: "Cpu",
        RS: "User",
        PP: "Draw",
        PR: "User",
        PS: "Cpu",
        SS: "Draw",
        SR: "Cpu",
        SP: "User",
      };

      let outcomeValue = outcomes[userValue + cpuValue];

      result.textContent = userValue === cpuValue ? "Match Draw" : `${outcomeValue} Won!!`;

      // Update the score based on the outcome
      if (outcomeValue === "User") {
        score.user++;
      } else if (outcomeValue === "Cpu") {
        score.cpu++;
      } else {
        score.draw++;
      }

      // Update the scoreboard
      updateScoreboard();
    }, 2500);
  });
});