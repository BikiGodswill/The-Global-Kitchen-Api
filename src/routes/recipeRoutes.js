const express = require("express");
const router = express.Router();
const recipe = require("../controllers/recipeControllers");

router.route("/").get(recipe.getRecipes);
router.route("/:id").get(recipe.getRecipe);
module.exports = router;
