var noOfDrums = document.querySelectorAll(".drum").length;
for (var i = 0; i < noOfDrums; i++) 
{
  document.querySelectorAll(".drum")[i].addEventListener("click", function ()
   {
        var buttonInnerHTML=this.innerHTML;
        buttonAnimation(buttonInnerHTML);
        switch(buttonInnerHTML){
          case "w": var audio = new Audio("sounds/1.wav");//replace
                     audio.play();  
                     break;
          case "a": var audio = new Audio("sounds/2.wav");
                    audio.play();  
                    break;
          case "s": var audio = new Audio("sounds/3.wav");
                    audio.play();  
                    break;
          case "d": var audio = new Audio("sounds/4.wav");
                    audio.play();  
                    break;
          case "j": var audio = new Audio("sounds/5.wav");
                    audio.play();  
                    break;
          case "k": var audio = new Audio("sounds/6.wav"); //replace
                    audio.play();  
                    break;
          case "l": var audio = new Audio("sounds/7.wav");
                    audio.play();  
                    break;
          default:console.log(buttonInnerHTML);
        }
           
  });
}
document.addEventListener("keypress",function(event){
makeSound(event.key);
buttonAnimation(event.key)
});
function makeSound(key)
{
  switch(key){
        case "w": var audio = new Audio("sounds/1.wav");//replace
        audio.play();  
        break;
      case "a": var audio = new Audio("sounds/2.wav");
      audio.play();  
      break;
    case "s": var audio = new Audio("sounds/3.wav");
      audio.play();  
      break;
    case "d": var audio = new Audio("sounds/4.wav");
      audio.play();  
      break;
    case "j": var audio = new Audio("sounds/5.wav");
      audio.play();  
      break;
    case "k": var audio = new Audio("sounds/6.wav"); 
      audio.play();  
      break;
    case "l": var audio = new Audio("sounds/7.wav");
      audio.play();  
      break;
      default:console.log(key);
  }
}
function buttonAnimation(currentkey)
{
   var activeButton=document.querySelector("."+ currentkey);
   activeButton.classList.add("pressed");
   setTimeout(function(){
    activeButton.classList.remove("pressed");
   },100);
}


