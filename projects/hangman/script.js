const letterContainer = document.getElementById("letterContainer");
const optionsContainer = document.getElementById("options-container")
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container")
const newGameButton = document.getElementById("new-game-btn");
const canvas = document.getElementById("canvas")
const result = document.getElementById("result")


let options = {
    fruits: ["apple", "banana", "orange", "grape", "watermelon", "strawberry", "mango", "pineapple", "kiwi", "pear", "cherry", "blueberry", "lemon", "peach", "plum", "raspberry", "avocado", "pomegranate", "coconut", "fig"]
    ,
    animals: ["dog", "cat", "elephant", "lion", "tiger", "giraffe", "zebra", "monkey", "panda", "koala", "rabbit", "hippo", "bear", "wolf", "fox", "deer", "horse", "cow", "sheep", "goat"],
    countries: ["United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Italy", "Spain", "China", "Japan", "India", "Brazil", "Mexico", "Russia", "South Africa", "Egypt", "Greece", "Argentina", "Turkey", "Saudi Arabia", "Bhutan", "Fiji", "Iceland", "Maldives", "Monaco", "Nepal", "Papua New Guinea", "Suriname", "Tajikistan", "Uzbekistan"],
    colors: ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "purple", "pink", "brown", "black", "white", "gray", "silver", "gold"],
    planets: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"],
    landmarks: ["Eiffel Tower", "Great Wall of China", "Taj Mahal", "Pyramids of Giza", "Statue of Liberty", "Machu Picchu", "Colosseum", "Christ the Redeemer", "Petra", "Acropolis"]
};

let winCount = 0;
let count = 0;
let chosenWord = " "

const displayOptions = () => {
    optionsContainer.innerHTML += `<h3>Please Select an option </h3>`;
    let buttonCon = document.createElement("div")
    for (let value in options) {
        buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}`;
    }
    optionsContainer.appendChild(buttonCon);
};

const blocker = () => {
    let optionsButtons = document.querySelectorAll(".options")
    let letterButtons = document.querySelectorAll(".letters");

    optionsButtons.forEach((button) => {
        button.disabled = true;
    });

    letterButtons.forEach((button) => {
        button.disabled = true;
    });
    newGameContainer.classList.remove("hide")
}

const generateWord = (optionValue) => {
    let optionsButtons = document.querySelectorAll(".options");
    optionsButtons.forEach((button) => {
        if (button.innerText.toLowerCase() === optionValue) {
            button.classList.add("active");
        }
        button.disabled = true;
    });
    letterContainer.classList.remove("hide");
    userInputSection.innerText = "";

    let optionArray = options[optionValue];
    chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
    chosenWord = chosenWord.toUpperCase();
 

    let displayItem = chosenWord.replace(/./g, '<span class="dashes"> _ </span>');


    userInputSection.innerHTML = displayItem;
};

const qwertyLayout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"]
];


const initializer = () => {
    winCount = 0;
    count = 0;
   
    userInputSection.innerHTML = "";
    optionsContainer.innerHTML = "";
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");
    letterContainer.innerHTML = "";

    

    for (let i = 0; i < qwertyLayout.length; i++) {
        let row = document.createElement("div");
        row.classList.add("qwerty-row");

        for (let j = 0; j < qwertyLayout[i].length; j++) {
            let button = document.createElement("button");
            button.classList.add("letters");
            button.innerText = qwertyLayout[i][j];


            button.addEventListener("click", () => {
                let charArray = chosenWord.split("");
                let dashes = document.getElementsByClassName("dashes");

                if (charArray.includes(button.innerText)) {
                    charArray.forEach((char, index) => {
                        if (char === button.innerText) {
                            dashes[index].innerText = char;
                            winCount += 1;
                            if (winCount == charArray.length) {
                                result.innerHTML = `<h2 class='win-msg'>You Win!!</h2><p>The word was <span>${chosenWord}</span></p>`;
                                blocker();
                            }
                        }
                    });
                } else {
                    count += 1;
                    drawMan(count);
                    if (count == 6) {
                        result.innerHTML = `<h2 class='lose-msg'>You Lose!!</h2><p>The word was <span>${chosenWord}</span></p>`;
                        blocker();
                    }
                }
                button.disabled = true;
            });
            row.appendChild(button);
        }
        letterContainer.appendChild(row);
    }
    displayOptions();
    let { initialDrawing } = canvasCreator();
    initialDrawing();
    
}

const canvasCreator = () => {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000"
    context.lineWidth = 2;

    const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();

    };

    const head = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2, true);
        context.stroke();
    }

    const body = () => {
        drawLine(70, 40, 70, 80)
    };

    const leftArm = () => {
        drawLine(70, 50, 50, 70)
    }

    const rightArm = () => {
        drawLine(70, 50, 90, 70)
    }

    const leftLeg = () => {
        drawLine(70, 80, 50, 110);
    }

    const rightLeg = () => {
        drawLine(70, 80, 90, 110);
    }

    const initialDrawing = () => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height)

        drawLine(10, 130, 130, 130)
        drawLine(10, 10, 10, 131)
        drawLine(10, 10, 70, 10)
        drawLine(70, 10, 70, 20)
    }

    return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };
}

const drawMan = (count) => {
    let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
    switch (count) {
        case 1:
            head();
            break;
        case 2:
            body();
            break;
        case 3:
            leftArm();
            break;
        case 4:
            rightArm();
            break;
        case 5:
            leftLeg();
            break;
        case 6:
            rightLeg();
            break;
        default:
            break;
    }
};

newGameButton.addEventListener("click", initializer);
window.onload = initializer;