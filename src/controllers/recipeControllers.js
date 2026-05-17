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
