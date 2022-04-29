import { getRecipes } from './recipes';
import { getFilters } from './filters';
import { removeIngredient, toggleIngredient } from './ingredients';

const generateIngredientDOM = (ingredient) => {
    const labelEl = document.createElement('label');
    labelEl.classList.add('d-flex', 'justify-content-between', 'my-2');
    const containerEl = document.createElement('div');
    containerEl.classList.add('d-flex', 'align-items-baseline');
    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.checked = ingredient.have;
    checkboxEl.addEventListener('change', () => {
        toggleIngredient(ingredient.id);
        renderIngredients();
    });

    const textEl = document.createElement('span');
    textEl.textContent = ingredient.text;
    textEl.classList.add('mx-2');

    const buttonEl = document.createElement('button');
    buttonEl.setAttribute('id', 'remove-ingredient');
    buttonEl.textContent = 'remove';
    buttonEl.addEventListener('click', () => {
        removeIngredient(ingredient.id);
        renderIngredients();
    });

    containerEl.appendChild(checkboxEl);
    containerEl.appendChild(textEl);
    labelEl.appendChild(containerEl);
    labelEl.appendChild(buttonEl);

    return labelEl;
};

const renderIngredients = () => {
    let ingredientEl = document.querySelector('#ingredients');
    ingredientEl.innerHTML = '';
    const recipeId = location.hash.substring(1);
    const recipes = getRecipes();
    const recipe = recipes.find((recipe) => recipe.id === recipeId);
    const sortIngredients = recipe.ingredients.sort((a, b) => {
        if (a.text.toUpperCase() < b.text.toUpperCase()) {
            return -1;
        } else if (a.text.toUpperCase() > b.text.toUpperCase()) {
            return 1;
        } else {
            return 0;
        };
    });
    if (sortIngredients.length > 0) {
        sortIngredients.forEach((ingredient) => {
            document.querySelector('#ingredients').appendChild(generateIngredientDOM(ingredient));
        });
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Add some ingredients';
        emptyMessage.classList.add('my-2');
        ingredientEl.appendChild(emptyMessage);
    };
};

const initializedRecipePage = (recipeId) => {
    const titleEl = document.querySelector('#recipe-title');
    const instructionsEl = document.querySelector('#instructions');
    const recipes = getRecipes();
    const recipe = recipes.find((recipe) => recipe.id === recipeId);

    if (!recipe) {
        location.assign('/index.html');
    };

    titleEl.value = recipe.title;
    instructionsEl.value = recipe.instructions;
};

const generateRecipeDOM = (recipe) => {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card', 'my-3')
    const recipeEl = document.createElement('a');
    recipeEl.classList.add('card-body')
    const textEl = document.createElement('h4');
    const statusEl = document.createElement('p');
    let status = '';
    recipe.title.length > 0 ? textEl.textContent = recipe.title : textEl.textContent = 'Unnamed recipe';
    recipeEl.appendChild(textEl);
    recipeEl.setAttribute('href', `/edit.html#${recipe.id}`);
    const filteredIngredients = recipe.ingredients.filter((ingredient) => ingredient.have === true);
    if (filteredIngredients.length === 0) {
        status = 'none of';
    } else if (filteredIngredients.length === recipe.ingredients.length) {
        status = 'all'
    } else {
        status = 'some of'
    };
    statusEl.textContent = `You have ${status} the ingredients`
    recipeEl.appendChild(statusEl);
    cardEl.appendChild(recipeEl);
    return cardEl;
};

const renderRecipes = () => {
    const recipesEl = document.querySelector('#recipes');
    const filters = getFilters();
    const recipes = getRecipes().sort((a, b) => {
        if (a.title.toUpperCase() < b.title.toUpperCase()) {
            return -1;
        } else if (a.title.toUpperCase() > b.title.toUpperCase()) {
            return 1;
        } else {
            return 0;
        };
    });
    const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()));
    recipesEl.innerHTML = '';
    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            const recipeEl = generateRecipeDOM(recipe);
            recipesEl.appendChild(recipeEl);
        });
    } else {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No recipes to show';
        emptyMessage.classList.add('my-3');
        recipesEl.appendChild(emptyMessage);
    }
};


export { generateIngredientDOM, renderIngredients, initializedRecipePage, renderRecipes, generateRecipeDOM }