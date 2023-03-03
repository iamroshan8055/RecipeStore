const mongoose = require('mongoose');
const Recipe = mongoose.model('recipe');

var sendJSONresponse = function(res, status, content) {
    res.status(status).json(content);
};

var doAddIngredients = function(req, res, recipe) {

    if(!recipe){
        sendJSONresponse(res, 404, "ingredientid not found");
        return;
    }

    recipe.ingredients.push({
        ing_name: req.body.ing_name,
        quantity: req.body.quantity,
        qntty_measure: req.body.qntty_measure,
    });

    recipe.save(function(err, recipe){
       
        if(err){
            sendJSONresponse(res, 500, err);
            return;
        }

        var newReview = recipe.ingredients[recipe.ingredients.length - 1];
        sendJSONresponse(res, 201, newReview);
    });
};

module.exports.ingredientsCreate = function(req, res) {

    if(!req.params.ingredientid){
        sendJSONresponse(res, 400, { message: 'ingredientId is required'});
        return;
    }
    
    Recipe.findById(req.params.ingredientid).select('ingredients').exec(function(err, recipe){

        if(err){
            sendJSONresponse(res, 500, err);
            return;
        }

        doAddIngredients(req, res, recipe);
    });

};

module.exports.ingredientsReadOne = function(req, res) {

    if(!req.params || !req.params.ingredientid || !req.params.ingredientid){
        sendsJSONresponse(res, 400, { message: 'Hello from API ingredientsReadOne endpoint'});
        return;
    }
   
    try {

        Recipe.findById(req.params.ingredientid).select('name ingredients').exec(function(err, recipe){

            if(err){
                sendJSONresponse(res, 500, err);
                return;
            }
    
            if(!recipe){
                sendJSONresponse(res, 404, { message: 'recipe not found!'});
                return;
            }
    
            var review, response;
    
            review = recipe.ingredients.id(req.params.ingredientid);
    
            if(!review) {
                sendJSONresponse(res, 404, { message: 'Ingredient not found!'});
                return;
            }
    
            response = {
                recipe: {
                    rec_name: recipe.rec_name,
                    id: req.params.ingredientid
                },
                review: review
            };
    
            sendJSONresponse(res, 200, response);
        });
    }
    catch(err) {
        sendJSONresponse(res, 500, err);
    }
    
};

module.exports.ingredientsUpdateOne = function(req, res) {
    
    if (!req.params.ingredientid || !req.params.ingredientid) {
        sendJSONresponse(res, 400, { "message": "ingredientid and ingredientid are both required"  });
        return;
    }

    Recipe.findById(req.params.ingredientid).select('ingredients').exec(function(err, recipe){

        if (err) {
            sendJSONresponse(res, 500, err);
            return;
        }

        if (!recipe || !recipe.ingredients || recipe.ingredients.length === 0 || !recipe.ingredients.id(req.params.ingredientid)) {
            sendJSONresponse(res, 404, { "message": "recipe not found" });
            return;
        } 

        var updatedIngredient = recipe.ingredients.id(req.params.ingredientid);

        updatedIngredient.ing_name = req.body.ing_name;        
        updatedIngredient.quantity = req.body.quantity;        
        updatedIngredient.qntty_measure = req.body.qntty_measure;       
        
        recipe.save(function(err, recipe){

            if (err) {
                sendJSONresponse(res, 500, err);
                return;
              } 

              sendJSONresponse(res, 200, updatedIngredient);
        });

    });

};

module.exports.ingredientsDeleteOne = function(req, res) {
   
    if (!req.params.ingredientid || !req.params.ingredientid) {
        sendJSONresponse(res, 400, { "message": "ingredientid and ingredientid are both required" });
      return;
    }

    Recipe.findById(req.params.ingredientid).select('ingredients').exec(function(err, recipe){

        if (err) {
            sendJSONresponse(res, 500, err);
            return;
        }
    
        if (!recipe || !recipe.ingredients || recipe.ingredients.length === 0 || !recipe.ingredients.id(req.params.ingredientid)) {
            sendJSONresponse(res, 404, { "message": "recipe not found" });
            return;
        } 

        recipe.ingredients.id(req.params.ingredientid).remove();

        recipe.save(function(err){

            if (err) {
                sendJSONresponse(res, 500, err);
                return;
            } 
            sendJSONresponse(res, 204, null);
        });

    });

};




