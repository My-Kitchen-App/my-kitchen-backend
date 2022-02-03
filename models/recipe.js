'use strict'

const mongoose = require('mongoose');
const {Schema} = mongoose;

const recipeSchema = new Schema ({
  email: { type: String },
  title: { type: String },
  image: { type: String },
  apiId: { type: Number },
  notes: { type: String },
  instructions: { type: Array },
  usedIngredients: { type: Array },
  missedIngredients: { type: Array },
  missedIngredientsCount: { type: Number }
});

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe;
