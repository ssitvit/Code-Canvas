//Responsive navbar menu open/close
//Select menu button
const menuBtn = document.querySelector(".menu-btn");
//Select menu
const menu = document.querySelector(".menu");
//Add click event to menu button
menuBtn.addEventListener("click", ()=>{
    //Toggle between X and menu icon in the button
    menuBtn.firstElementChild.classList.toggle('fa-times');
    //Toggle between opened and closed menu styles
    menu.classList.toggle("menu-open");
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
    if(e.ctrlKey && e.keyCode=="S".charCodeAt(0)){
        return false;
    }
};