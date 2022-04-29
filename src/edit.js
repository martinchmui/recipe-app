import { addIngredient } from './ingredients';
import { deleteRecipe, loadRecipes, saveRecipes, updateRecipe } from './recipes';
import { initializedRecipePage, renderIngredients } from './views';

const recipeId = location.hash.substring(1);
initializedRecipePage(recipeId);
renderIngredients();

document.querySelector('#recipe-title').addEventListener('input', (e) =>{
   updateRecipe(recipeId, {
        title: e.target.value
    });
});

document.querySelector('#instructions').addEventListener('input', (e) =>{
   updateRecipe(recipeId, {
        instructions: e.target.value
    });
});

document.querySelector('#add-ingredient').addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        document.getElementById('ingredient-button').click();
    };
});

document.querySelector('#ingredient-button').addEventListener('click', () => {
    let ingredient = document.querySelector('#add-ingredient');
    if (ingredient.value != '') {
        addIngredient(ingredient.value);
        renderIngredients();
        saveRecipes();
        ingredient.value = '';
    };
});

document.querySelector('#delete-recipe').addEventListener('click', () => {
    deleteRecipe(recipeId);
    location.assign('/index.html');
});

loadRecipes();

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        initializedRecipePage(recipeId);
    };
});