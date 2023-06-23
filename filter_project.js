const card_grid = document.querySelector('.card-grid');
const input = document.querySelector('.input-container input');
const category_select = document.querySelector('.input-container select');

// store all the project card present initially 

const project_card = document.querySelectorAll('.card');

input.addEventListener('input', () => {

    // get the value selected from dropdown
    let category = category_select.value;

    // select the value from input
    const search_value = input.value;

    category = category.toLowerCase()

    if(category == 'title') {
        category='heading'
    }

    // display the projects whose category matches and that category contains the input value
    displayRequiredProjects(category, search_value);
    
})

const displayRequiredProjects = (category, search_value) => {
    let found_card = "";
    project_card.forEach((p) => {
        const tag = p.querySelector(`.card__content .card__${category}`);
        if(tag.innerText.toLowerCase().includes(search_value.toLowerCase())) {
            found_card += p.outerHTML;
        }
    })

    // if no such cards are found then display the following message
    if(!found_card.length) found_card='<h2 style="color: red";>Cannot find the project</h1>'

    card_grid.innerHTML = found_card;
};

// Scroll to the top when the button is clicked
const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
  if(window.pageYOffset >100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
})
