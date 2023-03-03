var mongoose = require('mongoose');

var ingredientsSchema = new mongoose.Schema({
    ing_name: {
        type: String,
        "default":""
    },
    quantity: {
        type: Number,
        min: 1,
        "default":1
    },
    qntty_measure: {
        type: String,
        "default":""
    }
});

var reviewsSchema = new mongoose.Schema({
    user_name: {
        type: String,
        'default':'Unknown User',
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        'default':0,
    },
    reviewText: {
        type: String,
        "default":"Amazing Recipe, meticulous explanation of recipe and Mouth watering output.",
    },
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

var recipeSchema = new mongoose.Schema({
    rec_name: {
        type: String,
        required: true
    },
    rec_img_URL: {
        type: String,
        "default":"/images/table_images/no_recipe.png"
    },
    rec_detail: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        "default":0
    },
    ingredients: [ingredientsSchema],
    dish_type: {
        type: String,
    },
    reviews: [reviewsSchema]
});

mongoose.model('recipe', recipeSchema, 'recipes');