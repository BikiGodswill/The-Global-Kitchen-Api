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

  //cooking time must be a positive finite number
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
exports.updateRecipe = async (id, updateData) => {
  // Prevent clients from overwriting the _id field
  delete updateData._id;

  // If cookingTime is being updated, enforce the positive-number rule
  if (updateData.cookingTime !== undefined) {
    const time = Number(updateData.cookingTime);
    if (!Number.isFinite(time) || time <= 0) {
      const error = new Error("Cooking time must be a positive number");
      error.statusCode = 400;
      throw error;
    }
    updateData.cookingTime = time;
  }

  const updatedRecipe = await Recipe.findByIdAndUpdate(
    id,
    { $set: updateData },
    {
      new: true, // Return the document after the update
      runValidators: true, // Re-run schema validators on the changed fields
    },
  );

  return updatedRecipe;
};