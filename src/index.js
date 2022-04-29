import { setFilters } from "./filters";
import { addRecipe } from "./recipes"
import { renderRecipes } from "./views";

renderRecipes();

document.querySelector('#search-text').addEventListener('input', (e) =>{
    setFilters({
        searchText: e.target.value
    });
    renderRecipes();
});

document.querySelector('#add-recipe').addEventListener('click', () =>{
    const id = addRecipe();
    location.assign(`edit.html#${id}`);
});

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        renderRecipes();
    };
});