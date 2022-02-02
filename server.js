'use strict'


require('dotenv').config()
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const Recipe = require('./Model/recipe');
const Instructions = require('./Model/instructions');

//const verifyUser = require('./auth.js');

// mongoose connection
mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Mongoose is connected')
});

const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 3001

// routes
app.get('/recipes', handleGetRecipes);
app.get('/saved-recipes', handleGetSavedRecipes);
app.post('/recipe', handlePostRecipe);
app.delete('/recipe/:id', handleDeleteRecipe);
app.put('/recipe/:id', handlePutRecipe);
app.get('/analyzedInstructions', handleGetAnalyzedInstructions); 
//app.get('/user', handleGetUser);

async function handleGetRecipes(req, res) {
  let ingredient = req.query.ingredient;
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=5&apiKey=${process.env.API_KEY}`
  let recipes = await axios.get(url)
  // console.log(recipes.data);
  let groomedRecipes = recipes.data.map(obj => new RecipeData(obj));
  res.send(groomedRecipes);
}

class RecipeData {
  constructor(recipe) {
    this.title = recipe.title,
      this.image = recipe.image,
      this.apiId = recipe.id,
      this.usedIngredients = recipe.usedIngredients,
      this.missedIngredients = recipe.missedIngredients,
      this.missedIngredientsCount = recipe.missedIngredientsCount
  }
}

async function handleGetSavedRecipes(req, res) {
  let queryObject = {}
  if (req.query.email) {
    queryObject = {
      email: req.query.email
    }
    // verifyUser(req, async (err, user) => {
    //   if (err) {
    //     console.error(err);
    //     res.send('invalid token');
    //   } else {
    try {
      let savedRecipes = await Recipe.find({ queryObject });
      if (savedRecipes.length > 0) {
        res.status(200).send(savedRecipes);
      } else {
        res.status(404).send('No Recipes Found');
      }
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }
}

async function handlePostRecipe(req, res) {
  try {
    const savedRecipe = await Recipe.create(req.body)
    res.status(200).send(savedRecipe);
  } catch (err) {
    res.status(500).send('Server Error');
  }
}

async function handleDeleteRecipe(req, res) {
  let id = req.params.id;
  console.log(req.params);
  try {
    await Recipe.findByIdAndDelete(id);
    res.status(200).send('Successfully deleted');
  } catch (err) {
    res.status(404).send(`Unable to delete id: ${id}`);
  }
}

async function handlePutRecipe(req, res) {
  let id = req.params.id;
  try {
    let updatedRecipe = await Recipe.findByIdAndUpdate(id, req.body, {
      new: true, overwrite: true
    });
    res.status(200).send(updatedRecipe);
  } catch (err) {
    res.status(404).send('Unable to update')
  }
}


async function handleGetAnalyzedInstructions(req, res) {
  let recipeid = req.query.recipeid;
 
  const url = `https://api.spoonacular.com/recipes/${recipeid}/analyzedInstructions?apiKey=${process.env.API_KEY}`

  let instructions = await axios.get(url)
  console.log(instructions.data);
  let groomedInstructions = instructions.data.map(obj => new InstructionsData(obj));
  console.log(groomedInstructions);
  res.send(groomedInstructions);
}


class InstructionsData {
  constructor(instructions) {
    this.steps = instructions.steps
  }
}


// function handleGetUser(req, res) {
//   verifyUser(req, (err, user) => {
//     if (err) {
//       console.log(err);
//       res.send('invalid token');
//     } else {
//       res.send(user);
//     }
//   });
// }


app.listen(PORT, () => console.log(`Listening on ${PORT}`));
