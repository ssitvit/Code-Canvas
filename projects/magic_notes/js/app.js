console.log("Welcome to Magic Notes website")
shownotes();

// if user adds a notes,add it to the localStorage
let addBtn=document.getElementById('addBtn');
addBtn.addEventListener('click',function(e){
    let addText=document.getElementById('addText');
    let addTitle=document.getElementById('addTitle');
    let notes=localStorage.getItem('notes');
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
     let myObj={
         title:addTitle.value,
         text:addText.value
     }
    notesObj.push(myObj);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    addText.value="";
    addTitle.value="";
    // console.log(notesObj);

    shownotes();
});

// function for add a notes
function shownotes(){
    let notes=localStorage.getItem('notes');
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes)
    }
    let html="";
    notesObj.forEach(function(element,index) {
        html += ` <div class="noteCard my-2  col-md-3">
        <div class="card1 p-4"  style=" border:2px solid white;">
        <div class="card-body">
          <h5 class="card-title"> ${element.title}</h5>
          <p class="card-text">${element.text}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
        </div>
        </div> ` 
        
    });

    let notesElm=document.getElementById('notes')
    if(notesObj.length!=0){
        notesElm.innerHTML=html;
    }
    else{
        notesElm.innerHTML="Nothing to show! use  'Add a note' section to add a note."
    }
};

// for deleting  notes

function deleteNote(index){
    // console.log("i am deleting",index)
    let notes=localStorage.getItem('notes');
    if(notes==null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(notesObj));
    shownotes(); 
};
// function for searching notes

let search=document.getElementById('searchTxt');
search.addEventListener('input',function(){
    let inputVal=search.value.toLowerCase()
    // console.log("Search event fired!",inputVal)
    let noteCards=document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt=element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
        // console.log(cardTxt)


    });
});