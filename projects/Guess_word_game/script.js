const wordList = [
	{
		word: 'javascript',
		hint: 'programming language',
	},
	{
		word: 'piano',
		hint: 'a musical instrument',
	},
	{
		word: 'aim',
		hint: 'a purpose or intention',
	},
	{
		word: 'earth',
		hint: 'planet of our solar system',
	},
	{
		word: 'diamond',
		hint: 'a precious metal',
	},
	{
		word: 'amazon',
		hint: 'online shopping site',
	},
	{
		word: 'Python',
		hint: 'programming language',
	},
	{
		word: 'DSA',
		hint: 'related to programming',
	},
	{
		word: 'incidious',
		hint: 'horror movie',
	},
	{
		word: 'network',
		hint: 'related to computer',
	},
	{
		word: 'stranger',
		hint: 'an unknown person',
	},
	{
		word: 'jpeg',
		hint: 'a file format for image',
	},
	{
		word: 'mental',
		hint: 'related to the mind',
	},
	{
		word: 'map',
		hint: 'diagram represent of an area',
	},
	{
		word: 'island',
		hint: 'land surrounded by water',
	},
	{
		word: 'hockey',
		hint: 'a famous outdoor game',
	},
	{
		word: 'chess',
		hint: 'related to an indoor game',
	},
	{
		word: 'viber',
		hint: 'a social media app',
	},
	{
		word: 'github',
		hint: 'code hosting platform',
	},
	{
		word: 'png',
		hint: 'a image file format',
	},
	{
		word: 'silver',
		hint: 'precious greyish-white metal',
	},
	{
		word: 'mobile',
		hint: 'an electronic device',
	},
	{
		word: 'gpu',
		hint: 'computer component',
	},
	{
		word: 'java',
		hint: 'programming language',
	},
	{
		word: 'google',
		hint: 'famous search engine',
	},
	{
		word: 'venice',
		hint: 'famous city of waters',
	},
	{
		word: 'excel',
		hint: 'microsoft product for windows',
	},
	{
		word: 'mysql',
		hint: 'a relational database system',
	},
	{
		word: 'nepal',
		hint: 'developing country name',
	},
	{
		word: 'flute',
		hint: 'a musical instrument',
	},
	{
		word: 'crypto',
		hint: 'related to cryptocurrency',
	},
	{
		word: 'tesla',
		hint: 'unit of magnetic flux density',
	},
	{
		word: 'mars',
		hint: 'planet of our solar system',
	},
	{
		word: 'proxy',
		hint: 'related to server application',
	},
	{
		word: 'email',
		hint: 'related to exchanging message',
	},
	{
		word: 'html',
		hint: 'markup language for the web',
	},
	{
		word: 'air',
		hint: 'related to a gas',
	},
	{
		word: 'idea',
		hint: 'a thought or suggestion',
	},
	{
		word: 'server',
		hint: 'related to computer or system',
	},
	{
		word: 'svg',
		hint: 'a vector image format',
	},
	{
		word: 'jpeg',
		hint: 'a image file format',
	},
	{
		word: 'search',
		hint: 'act to find something',
	},
	{
		word: 'key',
		hint: 'small piece of metal',
	},
	{
		word: 'egypt',
		hint: 'a country name',
	},
	{
		word: 'joker',
		hint: 'psychological thriller film',
	},
	{
		word: 'dubai',
		hint: 'developed country name',
	},
	{
		word: 'photo',
		hint: 'representation of person or scene',
	},
	{
		word: 'nile',
		hint: 'largest river in the world',
	},
	{
		word: 'rain',
		hint: 'related to a water',
	},
];
const inputs = document.querySelector('.inputs'),
	hintTag = document.querySelector('.hint span'),
	guessLeft = document.querySelector('.guess-left span'),
	wrongLetter = document.querySelector('.wrong-letter span'),
	resetBtn = document.querySelector('.reset-btn'),
	typingInput = document.querySelector('.typing-input');

let word,
	maxGuesses,
	incorrectLetters = [],
	correctLetters = [];

function randomWord() {
	let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
	word = ranItem.word;
	maxGuesses = word.length >= 5 ? 8 : 6;
	correctLetters = [];
	incorrectLetters = [];
	hintTag.innerText = ranItem.hint;
	guessLeft.innerText = maxGuesses;
	wrongLetter.innerText = incorrectLetters;

	let html = '';
	for (let i = 0; i < word.length; i++) {
		html += `<input type="text" disabled>`;
		inputs.innerHTML = html;
	}
}
randomWord();

function initGame(e) {
	let key = e.target.value.toLowerCase();
	if (
		key.match(/^[A-Za-z]+$/) &&
		!incorrectLetters.includes(` ${key}`) &&
		!correctLetters.includes(key)
	) {
		if (word.includes(key)) {
			for (let i = 0; i < word.length; i++) {
				if (word[i] == key) {
					correctLetters += key;
					inputs.querySelectorAll('input')[i].value = key;
				}
			}
		} else {
			maxGuesses--;
			incorrectLetters.push(` ${key}`);
		}
		guessLeft.innerText = maxGuesses;
		wrongLetter.innerText = incorrectLetters;
	}
	typingInput.value = '';

	setTimeout(() => {
		if (correctLetters.length === word.length) {
			alert(`Congrats! You found the word ${word.toUpperCase()}`);
			return randomWord();
		} else if (maxGuesses < 1) {
			alert("Game over! You don't have remaining guesses");
			for (let i = 0; i < word.length; i++) {
				inputs.querySelectorAll('input')[i].value = word[i];
			}
		}
	}, 100);
}

resetBtn.addEventListener('click', randomWord);
typingInput.addEventListener('input', initGame);
inputs.addEventListener('click', () => typingInput.focus());
document.addEventListener('keydown', () => typingInput.focus());
