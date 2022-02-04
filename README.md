# my*kitchen*backend

This app takes in available ingredients from the user and calls upon the spoonacular API to present the user a variety of recipes using said ingredients. The app consists of a backend RESTful API built with express and node.js, and a React client frontend using the bootstrap library.

The vision of My Kitchen is to create an app that allows users to enter their available ingredients and receive a variety of recipes that incorporate them

My Kitchen aims to solve the logistical dilemma of using remaining pantry items and incorporating them into delicious recipes

**Version**: 1.0.0

## Contributors

* Kevin LaMarca
* Regan Hayes
* Hambalieu Jallow
* Shane Roach

### Auth0

![image](301*MyKitchen.png)

### Database Schema

![image](myKitchen_schema.png)

### Dependencies

* MongoDB
* Express
* Spoonacular API
* Axios
* Mongoose

### API Endpoints

* GET <https://api.spoonacular.com/recipes/324694/analyzedInstructions>
  * Ex: <https://spoonacular.com/food>*api/docs#Get*Analyzed*Recipe*Instructions
* GET <https://api.spoonacular.com/recipes/findByIngredients>
  * <https://spoonacular.com/food>*api/docs#Search*Recipes*by*Ingredients
