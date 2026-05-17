const mongoose = require("mongoose");
const recipeService = require("../services/recipeService");

exports.getRecipes = async (req, res, next) => {
  try {
    const { category } = req.query;
    const recipes = await recipeService.getAllRecipes(category);

    return res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes,
    });
  } catch (error) {
    next(error);
  }
};
exports.getRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;

    const recipe = await recipeService.getRecipeById(id);
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: `No recipe found with id ${id}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};
exports.createRecipe = async (req, res, next) => {
  try {
    const recipe = await recipeService.createRecipe(req.body);

    return res.status(201).json({
      success: true,
      message: "Recipe created successfully",
      data: recipe,
    });
  } catch (error) {
    next(error);
  }
};
