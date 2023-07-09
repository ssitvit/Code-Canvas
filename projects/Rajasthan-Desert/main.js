const images = document.querySelectorAll('.images img');

window.addEventListener('scroll', ()=>{
    images[0].style.top = "-" + (window.scrollY/1.2)+"px";
    images[1].style.top = "-" + (window.scrollY/3.5)+"px";
    images[2].style.top = "-" + (window.scrollY/6)+"px";
    images[3].style.top = "-" + (window.scrollY/7)+"px";
});

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
    if(e.ctrlKey && e.keyCode=="S".charCodeAt(0)){
        return false;
    }
};