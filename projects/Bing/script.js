const series = [
  {
    name: "The Pentaverate",
    rating: "7.8/10",
    overview:
      "A Canadian journalist in London investigates a secret society of five men who control the world.",
    image: "images/2.jpg",
  },
  {
    name: "Russian Doll",
    rating: "8.8/10",
    overview:
      "A woman keeps reliving the same day over and over again, and she must figure out why in order to break the loop.",
    image: "images/3.jpg",
  },
  {
    name: "Dead to Me",
    rating: "8.4/10",
    overview:
      "Two women bond over the death of their respective husbands, but their friendship is soon tested by secrets and lies.",
    image: "images/4.jpg",
  },
  {
    name: "The Witcher",
    rating: "8.2/10",
    overview:
      "A monster hunter for hire journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.",
    image: "images/5.jpg",
  },
  {
    name: "You ",
    rating: "8.1/10",
    overview:
      "A stalker becomes obsessed with a young woman and will do anything to be with her.",
    image: "images/6.jpg",
  },
  {
    name: "Locke & Key",
    rating: "7.8/10",
    overview:
      "Three siblings discover magical keys that give them special powers, but a sinister force is after them.",
    image: "images/7.jpg",
  },
  {
    name: "The Umbrella Academy",
    rating: "8.2/10",
    overview:
      "A dysfunctional family of superheroes must band together to save the world from an apocalypse they caused.",
    image: "images/8.jpg",
  },
  {
    name: "Stranger Things",
    rating: "8.7/10",
    overview:
      "A group of friends in a small town investigate the mysterious disappearance of their friend, and uncover a dark government conspiracy.",
    image: "images/9.jpg",
  },
  {
    name: "Cobra Kai",
    rating: "8.7/10",
    overview:
      "Thirty years after the events of the Karate Kid, a down-and-out Johnny Lawrence reopens his karate dojo, reigniting his rivalry with Daniel LaRusso.",
    image: "images/10.jpg",
  },
  {
    name: "The Woman in the House Across the Street from the Girl in the Window",
    rating: "8.2/10",
    overview:
      "A woman who drinks too much wine and watches too many true crime shows becomes convinced that she witnessed a murder across the street from her house.",
    image: "images/1.png",
  },
];

function generateSeriesList() {
  const seriesListElement = document.getElementById("seriesList");
  seriesListElement.innerHTML = "";

  series.forEach((item) => {
    const seriesItemElement = document.createElement("div");
    seriesItemElement.classList.add("card");

    const titleElement = document.createElement("h2");
    titleElement.textContent = item.name;

    const imageElement = document.createElement("img");
    imageElement.src = item.image;
    imageElement.alt = item.name;

    const ratingElement = document.createElement("p");
    ratingElement.classList.add("rating");
    ratingElement.textContent = `Rating: ${item.rating}`;

    const overviewElement = document.createElement("p");
    overviewElement.classList.add("overview");
    overviewElement.textContent = item.overview;

    seriesItemElement.appendChild(titleElement);
    seriesItemElement.appendChild(imageElement);
    seriesItemElement.appendChild(ratingElement);
    seriesItemElement.appendChild(overviewElement);

    seriesListElement.appendChild(seriesItemElement);
  });
}

generateSeriesList();
