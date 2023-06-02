function scrollToTop() {
  if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
  }
  window.scrollTo(0,0);
}

document.getElementById("easy-btn").addEventListener("click",function(){
  genMaze(10,30);
});
document.getElementById("medium-btn").addEventListener("click",function(){
  genMaze(20,30);
});
document.getElementById("hard-btn").addEventListener("click",function(){
  genMaze(30,30);
});



function genMaze(row,col){

let parentx = [];
let parenty = [];
// Initializing Maze with rows and cells
const max_x = row;
const max_y = col;
for (let i = 0; i < max_x; i++) {
  var table = document.getElementById("tableId");
  var row = table.insertRow();
  parenty[i] = [];
  parentx[i] = [];

  for (let j = 0; j < max_y; j++) {
      let cell1 = row.insertCell();
      if (i === 0 && j === 0) {
          cell1.setAttribute("class", "table-row border-top border-bottom border-right border-left");
      }
      else if (i === 0)
          cell1.setAttribute("class", "table-row border-top border-bottom border-right");
      else if (j === 0) {
          cell1.setAttribute("class", "table-row border-bottom border-right border-left");
      }
      else {
          cell1.setAttribute("class", "table-row border-bottom border-right");
      }
      parentx[i][j] = -1;
      parenty[i][j] = -1;
      cell1.setAttribute("id", "cell " + j + "," + i);
  }
}

let x = [];
let y = [];

function timeOut(index) {
  if (index === x.length * x.length + 1)
      return;
  else {
      setTimeout(function () {
          document.getElementById("cell " + x[index] + "," + y[index]).classList.remove("visited");
          document.getElementById("cell " + x[index] + "," + y[index]).classList.add("animate");
          timeOut(index + 1);
      }, 9);
  }
}

let ptrx = 0, ptry = 0;

let dirx = [0, 0, -1, 1];
let diry = [1, -1, 0, 0];

let count = 0;
let stackx = [];
let stacky = [];


// For generating Maze

while (count < max_x * max_y) {
  console.log("ptrx= " + ptrx + " ptry " + ptry);
  let length = 0;
  console.log("count " + count);
  let movex = [];
  let movey = [];
  for (let i = 0; i < 4; i++) {
      let tempx = ptrx + dirx[i];
      let tempy = ptry + diry[i];
      if (tempx >= 0 && tempy >= 0 && tempx < max_y && tempy < max_x) {
          console.log("i= " + i);
          console.log("tempx= " + tempx + " tempy= " + tempy);
          console.log("Checking ClassList:");
          console.log(document.getElementById("cell " + tempx + "," + tempy).classList);
          check = document.getElementById("cell " + tempx + "," + tempy).classList.contains("visited");
          if (check === false) {
              movex[length] = tempx;
              movey[length] = tempy;
              length++;
          }
      }
  }
  if (!document.getElementById("cell " + ptrx + "," + ptry).classList.contains("visited")) {
      x.push(ptrx);
      y.push(ptry);
  }

  if (count === max_x * max_y - 1) {
      console.log("max_y-1= " + (max_y - 1) + " max_1= " + (max_x - 1));
      document.getElementById("cell " + ptrx + "," + ptry).classList.add("visited");

      document.getElementById("cell " + 0 + "," + 0).classList.remove("border-left");
      document.getElementById("cell " + (max_y - 1) + "," + (max_x - 1)).classList.remove("border-right");
      break;
  }
  console.log("The move arrays are :");
  console.log(movex);
  console.log(movey);
  let newx, newy;
  console.log("The stack arrays are :");
  console.log(stackx);
  console.log(stacky);

  document.getElementById("cell " + ptrx + "," + ptry).classList.add("visited");

  if (movex.length === 0) {
      newx = stackx.pop();
      newy = stacky.pop();
      ptrx = newx;
      ptry = newy;
      console.log("On point of break " + newx + " " + newy);
  }
  else {
      stackx.push(ptrx);
      stacky.push(ptry);
      let index = Math.floor(movex.length * Math.random());
      console.log(" index= " + index);
      newx = movex[index];
      newy = movey[index];
      console.log(newx + " =newx and newy= " + newy);
      if (newx - ptrx === 1) {

          document.getElementById("cell " + ptrx + "," + ptry).classList.remove("border-right");
          document.getElementById("cell " + newx + "," + newy).classList.remove("border-left");


      }
      else if (newx - ptrx === -1) {
          document.getElementById("cell " + ptrx + "," + ptry).classList.remove("border-left");
          document.getElementById("cell " + newx + "," + newy).classList.remove("border-right");


      }
      else if (newy - ptry === 1) {
          document.getElementById("cell " + ptrx + "," + ptry).classList.remove("border-bottom");
          document.getElementById("cell " + newx + "," + newy).classList.remove("border-top");

      }
      else {
          document.getElementById("cell " + ptrx + "," + ptry).classList.remove("border-top");
          document.getElementById("cell " + newx + "," + newy).classList.remove("border-bottom");

      }
      ptrx = newx;
      ptry = newy;
      count++;

  }

}
timeOut(0); 


let queuex = [];
let queuey = [];
let tempx = 0;
let tempy = 0;
let lastx = max_y - 1, lasty = max_x - 1;

let bfsx = [];
let bfsy = [];
stackx = [];
stacky = [];


// Adding event Listener to SOLUTION button for finding solution

document.getElementById("btn-ans").addEventListener("click", function bfs() {
  document.getElementById("solution-popup").style.display = "none";
  document.getElementById("mypage").style.overflow = "auto";

  var element = document.getElementById('timer-val');
      var position = element.getBoundingClientRect();
      var scrolltotable = position.top;
      window.scrollTo({ top: scrolltotable, left: 0, behavior: "smooth" });

  queuex.push(lastx);
  queuey.push(lasty);
  console.log("Clicked");
  console.log("length= " + queuex.length);
  stackx.push(max_x - 1);
  stacky.push(max_y - 1);
  var t = 0;
  while (!document.getElementById("cell " + 0 + "," + 0).classList.contains("find-ans")) {
      console.log("times = " + t);
      document.getElementById("cell " + queuex[0] + "," + queuey[0]).classList.add("class", "find-ans");

      for (let i = 0; i < 4; i++) {

          console.log("Inside loop");
          tempx = queuex[0] + dirx[i];
          tempy = queuey[0] + diry[i];

          console.log("tempx= " + tempx + " tempy= " + tempy);
          if (tempx < max_y && tempy < max_x && tempx >= 0 && tempy >= 0) {
              var element = document.getElementById("cell " + tempx + "," + tempy);
              var check = document.getElementById("cell " + tempx + "," + tempy).classList.contains("find-ans");
              if (check === false) {
                  console.log("inside if");
                  if (i === 0 && !document.getElementById("cell " + queuex[0] + "," + queuey[0]).classList.contains("border-bottom")) {
                      parentx[tempy][tempx] = queuex[0];
                      parenty[tempy][tempx] = queuey[0];
                      element.classList.add("class", "find-ans");

                      queuex.push(tempx);
                      queuey.push(tempy);
                      bfsx.push(tempx);
                      bfsy.push(tempy);
                  }
                  if (i === 1 && !document.getElementById("cell " + tempx + "," + tempy).classList.contains("border-bottom")) {
                      parentx[tempy][tempx] = queuex[0];
                      parenty[tempy][tempx] = queuey[0];
                      element.classList.add("class", "find-ans");

                      queuex.push(tempx);
                      queuey.push(tempy);
                      bfsx.push(tempx);
                      bfsy.push(tempy);
                  }
                  if (i === 2 && !document.getElementById("cell " + tempx + "," + tempy).classList.contains("border-right")) {
                      parentx[tempy][tempx] = queuex[0];
                      parenty[tempy][tempx] = queuey[0];
                      element.classList.add("class", "find-ans");
                      stackx.push(tempx);
                      stacky.push(tempy);
                      queuex.push(tempx);
                      queuey.push(tempy);
                      bfsx.push(tempx);
                      bfsy.push(tempy);
                  }
                  if (i === 3 && !document.getElementById("cell " + queuex[0] + "," + queuey[0]).classList.contains("border-right")) {
                      parentx[tempy][tempx] = queuex[0];
                      parenty[tempy][tempx] = queuey[0];
                      element.classList.add("class", "find-ans");

                      queuex.push(tempx);
                      queuey.push(tempy);
                      bfsx.push(tempx);
                      bfsy.push(tempy);
                  }
              }
              else {
                  continue;
              }
          }
      }
      queuex.shift();
      queuey.shift();

      console.log("queuex:");
      console.log(queuex);
      console.log(queuey);
      t++;
  }
  tempx = 0; tempy = 0;
  let tx = 0, ty = 0;

  //For displaying path to find Ans

  function setTime(checkx, checky) {
      setTimeout(function () {
          if (checkx === -1 && checky === -1) {
              document.getElementById("try-again").style.display="flex";
              return;
          }
          document.getElementById("cell " + checkx + "," + checky).classList.add("class", "add-color");
          tx = parentx[checky][checkx];
          ty = parenty[checky][checkx];
          checkx = tx;
          checky = ty;
          setTime(checkx, checky);

      }, 30)
  }

  function time(index) {
      if (index === bfsx.length) {
          setTime(0, 0);
      }

      else {
          setTimeout(function () {
              console.log(index);
              console.log("cell " + bfsx[index] + "," + bfsy[index]);
              document.getElementById("cell " + bfsx[index] + "," + bfsy[index]).classList.add("ky");
              time(index + 1);
          }, 14);
      }
  }

  time(0);

});



// for user
var arrow_keys_handler = function(e) {
    switch(e.code){
        case "ArrowUp": case "ArrowDown": case "ArrowLeft": case "ArrowRight": 
            case "Space": e.preventDefault(); break;
        default: break; // do not block other keys
    }
};
window.addEventListener("keydown", arrow_keys_handler, false);

document.getElementById("cell " + (max_y - 1) + "," + (max_x - 1)).classList.add("marking");

let success=false;
var currentx = max_y - 1, currenty = max_x - 1;
document.addEventListener("keydown", function () {
  var key = event.key;
  console.log(key);
  var posx, posy;
  if (key === 'ArrowUp') {
      posx = currentx;
      posy = currenty - 1;
      if (posx >= 0 && posy >= 0 && posx < max_y && posy < max_x) {
          if (!document.getElementById("cell " + posx + "," + posy).classList.contains("border-bottom")) {
              if (!document.getElementById("cell " + currentx + "," + currenty).classList.contains("border-top")) {
                  document.getElementById("cell " + posx + "," + posy).classList.add("marking");
                  document.getElementById("cell " + currentx + "," + currenty).classList.remove("marking");
                  currentx = posx;
                  currenty = posy;
              }
          }
      }
  }
  if (key === 'ArrowLeft') {
      posx = currentx - 1;
      posy = currenty;
      if (posx >= 0 && posy >= 0 && posx < max_y && posy < max_x) {
          if (!document.getElementById("cell " + posx + "," + posy).classList.contains("border-right")) {
              if (!document.getElementById("cell " + currentx + "," + currenty).classList.contains("border-left")) {
                  document.getElementById("cell " + posx + "," + posy).classList.add("marking");
                  document.getElementById("cell " + currentx + "," + currenty).classList.remove("marking");
                  currentx = posx;
                  currenty = posy;
              }
          }
      }
  }
  if (key === 'ArrowDown') {
      posx = currentx;
      posy = currenty + 1;
      if (posx >= 0 && posy >= 0 && posx < max_y && posy < max_x) {
          if (!document.getElementById("cell " + posx + "," + posy).classList.contains("border-top")) {
              if (!document.getElementById("cell " + currentx + "," + currenty).classList.contains("border-bottom")) {
                  document.getElementById("cell " + posx + "," + posy).classList.add("marking");
                  document.getElementById("cell " + currentx + "," + currenty).classList.remove("marking");
                  currentx = posx;
                  currenty = posy;
              }
          }
      }
  }
  if (key === 'ArrowRight') {
      posx = currentx + 1;
      posy = currenty;
      if (posx >= 0 && posy >= 0 && posx < max_y && posy < max_x) {
          if (!document.getElementById("cell " + posx + "," + posy).classList.contains("border-left")) {
              if (!document.getElementById("cell " + currentx + "," + currenty).classList.contains("border-right")) {
                  document.getElementById("cell " + posx + "," + posy).classList.add("marking");
                  document.getElementById("cell " + currentx + "," + currenty).classList.remove("marking");
                  currentx = posx;
                  currenty = posy;
              }
          }
      }
  }
  if (posx === 0 && posy === 0) {
      success=true;
      document.querySelector(".bg-model").style.display = "flex";
      scrollToTop();
      document.getElementById("mypage").style.overflow = "hidden";
  }

});

// popup button
document.getElementById("restart").addEventListener("click", function () {
  window.location.reload();
});

// Exiting from popup
document.getElementById("cross").addEventListener("click", function () {
  document.querySelector(".bg-model").style.display = "none";
  document.getElementById("mypage").style.overflow = "auto";
});
document.getElementById("tryagain-btn").addEventListener("click",function(){
  window.location.reload();
});
scrollToTop();
document.getElementById("mypage").style.overflow = "hidden";
// For timer bar, For starting timer
// document.getElementById("btn-timer").addEventListener("click", function move() {

  document.getElementById("easy-btn").addEventListener("click",run);
  document.getElementById("medium-btn").addEventListener("click",run);
  document.getElementById("hard-btn").addEventListener("click",run());


  function run(){
  document.getElementById("popup-reload").style.display = "none";
  document.getElementById("mypage").style.overflow = "auto";

  console.log("I got clicked");
  let mins;
  let width = document.getElementById("outer-div").offsetWidth;
  let currentWidth = width;
  var times = 0;
  let totatsec = 120;
  let decrease = width / (totatsec * 10);
  let secs;
  function timer() {
      innerdiv();
      function innerdiv() {
          secs = totatsec % 60;
          mins = Math.floor(totatsec / 60);
          document.getElementById("min-ones").innerHTML = mins % 10;
          document.getElementById("min-tens").innerHTML = Math.floor(mins / 10);
          document.getElementById("ones").innerHTML = secs % 10;
          document.getElementById("tens").innerHTML = (Math.floor(secs / 10)) % 10;

          setTimeout(function () {
              if(success===true) return;
              if (totatsec === 0) {
                  scrollToTop();
                  document.getElementById("solution-popup").style.display = "flex";
                  document.getElementById("mypage").style.overflow = "hidden";
                  return;
              }
              if (times === 10) {
                  times = 0;
                  totatsec--;
              }
              if (totatsec < 90 && totatsec >= 60)
                  document.getElementById("timer-bar").style.backgroundColor = "rgb(231, 187, 40)";
              if (totatsec < 60 && totatsec >= 30)
                  document.getElementById("timer-bar").style.backgroundColor = "orange";
              if (totatsec < 30)
                  document.getElementById("timer-bar").style.backgroundColor = "red";
              document.getElementById("timer-bar").style.width = currentWidth + "px";
              currentWidth = currentWidth - decrease;
              times++;
              innerdiv();
          }, 100);
      }
  }
  timer();
}


}

