const facts = [
    "The Eiffel Tower in Paris was originally intended to be a temporary structure.",
    "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible.",
    "The average person will spend six months of their life waiting for red lights to turn green.",
    "The first computer programmer was a woman named Ada Lovelace.",
    "The world's oldest known creature, a mollusk, was 507 years old when scientists killed it by mistake.",
    "The shortest war in history lasted just 38 to 45 minutes.",
    "Octopuses have three hearts.",
    "The average person walks the equivalent of three times around the world in their lifetime.",
    "Cows have best friends and get stressed when they are separated from them.",
    "The longest recorded flight of a chicken is 13 seconds."
];

function generateRandomFact() {
    const randomIndex = Math.floor(Math.random() * facts.length);
    const fact = facts[randomIndex];
    document.getElementById("fact").textContent = fact;
}

// Event listener for the Generate button
document.getElementById("generateBtn").addEventListener("click", generateRandomFact);

// Event listener for the Copy button
document.getElementById("copyBtn").addEventListener("click", function () {
    const fact = document.getElementById("fact").textContent;
    navigator.clipboard.writeText(fact).then(function () {
        alert("Fact copied to clipboard!");
    });
});

// Generate initial random fact
generateRandomFact();

