const Recipe = require("../model/Recipe");

exports.getAllRecipes = async (category) => {
  const filter = {};
  if (category) {
    filter.category = { $regex: new RegExp(`^${category}$`, "i") };
  }
  const recipes = await Recipe.find(filter).sort({ createdAt: -1 });
  return recipes;
};
exports.getRecipeById = async (id) => {
  const recipe = await Recipe.findById(id);
  return recipe;
};
exports.createRecipe = async (recipeData) => {
  const {
    title,
    ingredients,
    instructions,
    cookingTime,
    difficulty,
    category,
  } = recipeData;

  // Business rule: cooking time must be a positive finite number
  if (!Number.isFinite(Number(cookingTime)) || Number(cookingTime) <= 0) {
    const error = new Error("Cooking time must be a positive number");
    error.statusCode = 400;
    throw error;
  }

  const newRecipe = await Recipe.create({
    title,
    ingredients,
    instructions,
    cookingTime: Number(cookingTime),
    difficulty,
    category,
  });

  return newRecipe;
};
