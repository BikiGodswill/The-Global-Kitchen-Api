const Recipe = require("../model/Recipe");

exports.getAllRecipes = async (category) => {
  const filter = {};
  if (category) {
    filter.category = { $regex: new RegExp(`^${category}$`, "i") };
  }
  const recipes = await Recipe.find(filter).sort({ createdAt: -1 });
  return recipes;
};
