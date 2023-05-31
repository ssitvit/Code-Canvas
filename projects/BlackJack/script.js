var dealerPoints = 0;
var playerPoints = 0;

var dealerAceCount = 0;
var playerAceCount = 0;

var hidden;
var deck;

var canHit = true;

window.onload = function () {
    document.getElementById("playBtn").addEventListener("click", startGame);
};

function getValue(card) {
    let data = card.split("_of_");
    let value = data[0];

    if (isNaN(value)) {
        if (value === "ace") {
            return 11;
        } else {
            return 10;
        }
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card.startsWith("ace")) {
        return 1;
    }
    return 0;
}

function reduceAce(points, aceCount) {
    while (points > 21 && aceCount > 0) {
        points -= 10;
        aceCount--;
    }
    return points;
}

function buildDeck() {
    let values = [
        "ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"
    ];
    let types = ["clubs", "diamonds", "hearts", "spades"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "_of_" + types[i]);
        }
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);

        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function startGame() {
    buildDeck();
    shuffleDeck();

    hidden = deck.pop();

    dealerAceCount += checkAce(hidden);

    for (let i = 0; i < 1; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./images/playing-cards/" + card + ".png";
        dealerPoints += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealerCards").appendChild(cardImg);
    }

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./images/playing-cards/" + card + ".png";
        playerPoints += getValue(card);
        playerAceCount += checkAce(card);
        document.getElementById("playerCards").appendChild(cardImg);
    }

    document.getElementById("game").classList.remove("hidden");

    document.getElementById("playBtn").removeEventListener("click", startGame);

    document.getElementById("dealerPoints").textContent = "Score: " + dealerPoints;
    document.getElementById("playerPoints").textContent = "Score: " + playerPoints;

    document.getElementById("hitBtn").addEventListener("click", hit);
    document.getElementById("standBtn").addEventListener("click", stand);
}

function hit() {
    if (!canHit) {
        return;
    }
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./images/playing-cards/" + card + ".png";
    playerPoints += getValue(card);
    playerAceCount += checkAce(card);
    document.getElementById("playerCards").appendChild(cardImg);


    if (reduceAce(playerPoints, playerAceCount) > 21) {
        canHit = false;
        stand()
    }

    document.getElementById("playerPoints").textContent = "Score: " + playerPoints;
}

function stand() {
    dealerPoints += getValue(hidden);
    dealerPoints = reduceAce(dealerPoints, dealerAceCount);
    playerPoints = reduceAce(playerPoints, playerAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./images/playing-cards/" + hidden + ".png";

    let message = "";
    if (playerPoints > 21) {
        message = "Player bust";
    } else if (dealerPoints > 21) {
        message = "You win";
    } else if (playerPoints === dealerPoints) {
        message = "Tie";
    } else if (playerPoints > dealerPoints) {
        message = "You Win!";
    } else if (playerPoints < dealerPoints) {
        message = "You Lose!";
    }
    document.getElementById("dealerPoints").textContent = "Score: " + dealerPoints;
    document.getElementById("playerPoints").textContent = "Score: " + playerPoints;
    document.getElementById("results").textContent = message;


}