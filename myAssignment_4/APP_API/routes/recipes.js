// APP_API folder

var express = require('express');
var router = express.Router();

var ctrlRecipe = require('../controllers/recipe');
var ctrlReviews = require('../controllers/reviews');
var ctrlIngredients = require('../controllers/ingredients');

// recipes
router.get('/recipes', ctrlRecipe.getRecipes);
router.post('/recipes', ctrlRecipe.createRecipe);
router.get('/recipes/:recipeid', ctrlRecipe.getSingleRecipe);
router.put('/recipes/:recipeid', ctrlRecipe.updateRecipe);
router.delete('/recipes/:recipeid', ctrlRecipe.deleteRecipe);

// reviews
router.post('/recipes/:recipeid/reviews', ctrlReviews.reviewsCreate);
router.get('/recipes/:recipeid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/recipes/:recipeid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/recipes/:recipeid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);

// ingredients
router.post('/recipes/:recipeid/ingredients', ctrlIngredients.ingredientsCreate);
router.get('/recipes/:recipeid/ingredients/:ingredientid', ctrlIngredients.ingredientsReadOne);
router.put('/recipes/:recipeid/ingredients/:ingredientid', ctrlIngredients.ingredientsUpdateOne);
router.delete('/recipes/:recipeid/ingredients/:ingredientid', ctrlIngredients.ingredientsDeleteOne);

module.exports = router;

