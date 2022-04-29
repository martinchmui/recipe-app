import { getRecipes, saveRecipes } from './recipes';
import uuidv4 from 'uuid/v4';

const recipeId = location.hash.substring(1);
let recipes = getRecipes();
let recipe = recipes.find((recipe) => recipe.id === recipeId);

const addIngredient = (text) => {
    const id = uuidv4();
    recipe.ingredients.push({
        id: id,
        text,
        have: false
    });
    saveRecipes();
};

const removeIngredient = (id) => {
    const ingredientIndex = recipe.ingredients.findIndex((ingredient) => ingredient.id === id);
    if (ingredientIndex > -1) {
        recipe.ingredients.splice(ingredientIndex, 1);
        saveRecipes();
    };
};

const toggleIngredient = (id) => {
    const ingredientIndex = recipe.ingredients.findIndex((ingredient) => ingredient.id === id);
    if (ingredientIndex > -1) {
        recipe.ingredients[ingredientIndex].have = !recipe.ingredients[ingredientIndex].have;
        saveRecipes();
    };
};

export { addIngredient, removeIngredient, toggleIngredient };