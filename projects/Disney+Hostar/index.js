let movies = [
	{
		name: "falcon and the winter soldier",
		des:
			"Following the events of Avengers: Endgame, Sam Wilson and Bucky Barnes team up in a global adventure that tests their abilities and their patience.",
		image: "images/slider 2.PNG"
	},
	{
		name: "loki",
		des:
			"The mercurial villain Loki resumes his role as the God of Mischief in a new series that takes place after the events of Avengers Endgame.",
		image: "images/slider 1.PNG"
	},
	{
		name: "wanda vision",
		des:
			"Living idealized suburban lives, super-powered beings Wanda and Vision begin to suspect that everything is not as it seems.",
		image: "images/slider 3.PNG"
	},
	{
		name: "raya and the last dragon",
		des:
			"Raya, a warrior, sets out to track down Sisu, a dragon, who transferred all her powers into a magical gem which is now scattered all over the kingdom of Kumandra, dividing its people.",
		image: "images/slider 4.PNG"
	},
	{
		name: "luca",
		des:
			"Set in a beautiful seaside town on the Italian Riviera, the original animated feature is a coming-of-age story about one young boy experiencing an unforgettable summer filled with gelato, pasta and endless scooter rides. ",
		image: "images/slider 5.PNG"
	}
];

const carousel = document.querySelector(".carousel");
let sliders = [];

let slideIndex = 0;

const createSlide = () => {
	if (slideIndex >= movies.length) {
		slideIndex = 0;
	}

	//creating DOM element
	let slide = document.createElement("div");
	let imgElement = document.createElement("img");
	let content = document.createElement("div");
	let h1 = document.createElement("h1");
	let p = document.createElement("p");

	//attaching all the elements
	imgElement.appendChild(document.createTextNode(""));
	h1.appendChild(document.createTextNode(movies[slideIndex].name));
	p.appendChild(document.createTextNode(movies[slideIndex].des));
	content.appendChild(h1);
	content.appendChild(p);
	slide.appendChild(content);
	slide.appendChild(imgElement);
	carousel.appendChild(slide);

	//setting up image
	imgElement.src = movies[slideIndex].image;
	slideIndex++;

	//setting elements classname
	slide.className = "slider";
	content.className = "slide-content";
	h1.className = "movie-title";
	p.className = "movie-des";

	sliders.push(slide);

	//adding sliding effect
	if (sliders.length) {
		sliders[0].style.marginLeft = `calc(-${100 * (sliders.length - 2)}% - ${
			30 * (sliders.length - 2)
		}px)`;
	}
};

for (let i = 0; i < 3; i++) {
	createSlide();
}

setInterval(() => {
	createSlide();
}, 3000);

//video cards

const videoCards = [...document.querySelectorAll(".video-card")];

videoCards.forEach((item) => {
	item.addEventListener("mouseover", () => {
		let video = item.children[1];
		video.play();
	});

	item.addEventListener("mouseleave", () => {
		let video = item.children[1];
		video.pause();
	});
});

//card sliders

let cardContainers = [...document.querySelectorAll(".card-container")];
let preBtns = [...document.querySelectorAll(".pre-btn")];
let nxtBtns = [...document.querySelectorAll(".nxt-btn")];

cardContainers.forEach((item, i) => {
	let containerDimensions = item.getBoundingClientRect();
	let containerWidth = containerDimensions.width;

	nxtBtns[i].addEventListener("click", () => {
		item.scrollLeft += containerWidth - 200;
	});

	preBtns[i].addEventListener("click", () => {
		item.scrollLeft -= containerWidth + 200;
	});
});
