function generateColor() {
  let x = Math.random() * 255;
  let y = Math.random() * 255;
  let z = Math.random() * 255;
  let o = Math.random();

  document.getElementsByClassName(
    "mainDiv"
  )[0].style.backgroundColor = `rgba(${x}, ${y}, ${z}, ${o})`;
}
