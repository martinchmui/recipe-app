import uuidv4 from 'uuid/v4';

let recipes = [];

const loadRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes');
    try {
        return recipesJSON ? JSON.parse(recipesJSON) : [];
    } catch (e) {
        return [];
    };
};

const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
};

const getRecipes = () => recipes;

const addRecipe = () => {
    const id = uuidv4();
    recipes.push({
        id: id,
        title: '',
        instructions: '',
        ingredients: []
    });
    saveRecipes();
    return id;
};

const deleteRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);
    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1);
        saveRecipes();
    };
};

const updateRecipe = (id, updates) => {
    const recipe = recipes.find((recipe) => recipe.id === id);
    if (!recipe) {
        return;
    };
    if (typeof updates.title === 'string') {
        recipe.title = updates.title;
    };
    if (typeof updates.instructions === 'string') {
        recipe.instructions = updates.instructions;
    };
    saveRecipes();
    return recipe;
};

recipes = loadRecipes();

export { addRecipe, getRecipes, deleteRecipe, loadRecipes, saveRecipes, updateRecipe };