const audioPlayer = document.getElementById('audioPlayer');
const play = document.getElementsByClassName('play');
const pause = document.getElementsByClassName('pause');
const next = document.getElementsByClassName('next');
const img = document.getElementById('img');

const music = ["music/grateful","music/careless","music/landscape"]
const images = ["grateful.jpg","careless.jpg","landscape.jpeg"]
let i = 0;
let playMusic = () => {
  audioPlayer.play();
}

let pauseMusic = () => {
  audioPlayer.pause();
}

let nextMusic = () => {
  audioPlayer.pause();
  img.src = "images/" + images[++i%3] ;
  audioPlayer.src =  music[i%3] + ".mp3";
  playMusic();
}
