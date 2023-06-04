// Get elements from the DOM
const aLeft = document.querySelector('.a-left');
const aRight = document.querySelector('.a-right');
const bg1 = document.querySelector('.content');
const bg2 = document.querySelector('.featured-icon');
const bg3 = document.querySelector('.side-img');

// Image id
let id = 1;

// Add click event to right arrow
aRight.addEventListener('click', ()=>{
    // Increment id
    id++;
    // If the id is larger than the amount of images 
    if(id>3){
        id=1;
    }
    // Set all images to current id
    bg1.style.backgroundImage = "url(img/img-lg"+id+".jpg)";
    bg2.style.backgroundImage = "url(img/img-lg"+id+".jpg)";
    bg3.style.backgroundImage = "url(img/img-sm"+id+".jpg)";
});

// Add click event to left arrow
aLeft.addEventListener('click', ()=>{
    id--;
    if(id<1){
        id=3;
    }
    // Set all images to current id
    bg1.style.backgroundImage = "url(img/img-lg"+id+".jpg)";
    bg2.style.backgroundImage = "url(img/img-lg"+id+".jpg)";
    bg3.style.backgroundImage = "url(img/img-sm"+id+".jpg)";
});

// disabling inspect element
document.addEventListener("contextmenu", function(e){
    e.preventDefault(); //this prevents right click
});
document.onkeydown=function(e){
    if(event.keycode==123){
        return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode=="I".charCodeAt(0)){
        return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode=="C".charCodeAt(0)){
        return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode=="J".charCodeAt(0)){
        return false;
    }
    if(e.ctrlKey && e.keyCode=="U".charCodeAt(0)){
        return false;
    }
};