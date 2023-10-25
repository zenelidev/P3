import { renderWorks } from "./works.js";
export function renderFilters() {
  //Grâce à  fetch on va aller recuperer les donnes dans categories
  fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    //Ensuite 
    .then((categories) => {
      //On va d'abord créer un bouton "Tous" pour une catégorie qui n'existe pas dans la liste des categories
      const filterDiv = document.createElement("div");
      filterDiv.className = "filterDiv";
      const allElementsButton = document.createElement("button");
      allElementsButton.innerText = "Tous";

      //necessaire pour le hover effect sur les boutons des filtres
      allElementsButton.classList.add('btn')
      //so its already green when page appears
      addActiveClass(allElementsButton)
      
      //On insere le btn dans la div filterDiv
      filterDiv.appendChild(allElementsButton);
      
      //On fait une boucle pour que chaque category dans categories ait un bouton créé 
      categories.forEach((category) => {
        const newButton = document.createElement("button");
        newButton.innerText = category.name;
        newButton.className = "btn"
        filterDiv.appendChild(newButton);
        
        newButton.addEventListener("click", function () {
          renderWorks(category.name);
          addActiveClass(newButton);
        });
        
      });
      
      const gallery = document.querySelector(".gallery");
      gallery.parentNode.insertBefore(filterDiv, gallery);

      allElementsButton.addEventListener("click", function () {
        addActiveClass(allElementsButton)
        renderWorks("Tous");
      });
      
    });

}
//to change the color when clicked on the btn
function addActiveClass(button){
  document.querySelectorAll(".btn").forEach((btn) => {
      btn.classList.remove("active")
  })
  button.classList.add("active")

}
