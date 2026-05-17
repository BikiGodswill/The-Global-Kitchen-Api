const mongoose = require("mongoose");

const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard"];

const CATEGORIES = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snack",
  "Appetizer",
  "Beverage",
];

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Recipe title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    ingredients: {
      type: [String],
      required: [true, "At least one ingredient is required"],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "Ingredients array must not be empty",
      },
    },

    instructions: {
      type: String,
      required: [true, "Cooking instructions are required"],
      trim: true,
      minlength: [10, "Instructions must be at least 10 characters long"],
    },

    cookingTime: {
      type: Number,
      required: [true, "Cooking time is required"],
      min: [1, "Cooking time must be at least 1 minute"],
    },

    difficulty: {
      type: String,
      required: [true, "Difficulty level is required"],
      enum: {
        values: DIFFICULTY_LEVELS,
        message: `Difficulty must be one of: ${DIFFICULTY_LEVELS.join(", ")}`,
      },
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: CATEGORIES,
        message: `Category must be one of: ${CATEGORIES.join(", ")}`,
      },
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

recipeSchema.index({ category: 1 });

recipeSchema.index({ category: 1, createdAt: -1 });

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
