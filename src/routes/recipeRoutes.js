const express = require("express");
const router = express.Router();
const recipe = require("../controllers/recipeControllers");

router.route("/").get(recipe.getRecipes).post(recipe.createRecipe);
router.route("/:id").get(recipe.getRecipe).patch(recipe.updateRecipe);
module.exports = router;
