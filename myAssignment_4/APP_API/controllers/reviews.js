const mongoose = require('mongoose');
const Recipe = mongoose.model('recipe');

var sendJSONresponse = function(res, status, content) {
    res.status(status).json(content);
};

var doAddReview = function(req, res, recipe) {

    if(!recipe){
        sendJSONresponse(res, 404, "recipeid not found");
        return;
    }

    recipe.reviews.push({
        user_name: req.body.user_name,
        rating: req.body.rating,
        reviewText: req.body.reviewText,
    });

    recipe.save(function(err, recipe){
       
        if(err){
            sendJSONresponse(res, 500, err);
            return;
        }

        updateAverageRating(recipe._id);

        var newReview = recipe.reviews[recipe.reviews.length - 1];
        sendJSONresponse(res, 201, newReview);
    });
};

var updateAverageRating = function(recipeId) {
    Recipe.findById(recipeId).select('reviews').exec(function(err, recipe){
        doSetAverageRating(recipe);
    });
};

var doSetAverageRating = function(recipe) {
 
    var reviewCount, ratingAverage, ratingTotal;

    if(recipe.reviews && recipe.reviews.length > 0) {

        reviewCount = recipe.reviews.length;
        ratingTotal = 0;

        for(var i = 0; i < reviewCount; i++) {
            ratingTotal += recipe.reviews[i].rating;
        }

        ratingAverage = parseInt(ratingTotal / reviewCount, 10);

        recipe.rating = ratingAverage;

        recipe.save(function(err){
            if(err){
                console.log(err);
            } else {
                console.log('Average rating updated to', ratingAverage);
            }
        });
    }

};

module.exports.reviewsCreate = function(req, res) {

    if(!req.params.recipeid){
        sendJSONresponse(res, 400, { message: 'recipeId is required'});
        return;
    }
    
    Recipe.findById(req.params.recipeid).select('reviews').exec(function(err, recipe){

        if(err){
            sendJSONresponse(res, 500, err);
            return;
        }

        doAddReview(req, res, recipe);
    });

};

module.exports.reviewsReadOne = function(req, res) {

    if(!req.params || !req.params.recipeid || !req.params.reviewid){
        sendsJSONresponse(res, 400, { message: 'Hello from API reviewsReadOne endpoint'});
        return;
    }
   
    try {

        Recipe.findById(req.params.recipeid).select('name reviews').exec(function(err, recipe){

            if(err){
                sendJSONresponse(res, 500, err);
                return;
            }
    
            if(!recipe){
                sendJSONresponse(res, 404, { message: 'recipe not found!'});
                return;
            }
    
            var review, response;
    
            review = recipe.reviews.id(req.params.reviewid);
    
            if(!review) {
                sendJSONresponse(res, 404, { message: 'Review not found!'});
                return;
            }
    
            response = {
                recipe: {
                    rec_name: recipe.rec_name,
                    id: req.params.recipeid
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

module.exports.reviewsUpdateOne = function(req, res) {
    
    if (!req.params.recipeid || !req.params.reviewid) {
        sendJSONresponse(res, 400, { "message": "recipeid and reviewid are both required"  });
        return;
    }

    Recipe.findById(req.params.recipeid).select('reviews').exec(function(err, recipe){

        if (err) {
            sendJSONresponse(res, 500, err);
            return;
        }

        if (!recipe || !recipe.reviews || recipe.reviews.length === 0 || !recipe.reviews.id(req.params.reviewid)) {
            sendJSONresponse(res, 404, { "message": "recipe not found" });
            return;
        } 

        var updatedReview = recipe.reviews.id(req.params.reviewid);

        updatedReview.user_name = req.body.user_name;        
        updatedReview.rating = req.body.rating;        
        updatedReview.reviewText = req.body.reviewText;       
        
        recipe.save(function(err, recipe){

            if (err) {
                sendJSONresponse(res, 500, err);
                return;
              } 

              updateAverageRating(recipe._id);

              sendJSONresponse(res, 200, updatedReview);
        });

    });

};

module.exports.reviewsDeleteOne = function(req, res) {
   
    if (!req.params.recipeid || !req.params.reviewid) {
        sendJSONresponse(res, 400, { "message": "recipeid and reviewid are both required" });
      return;
    }

    Recipe.findById(req.params.recipeid).select('reviews').exec(function(err, recipe){

        if (err) {
            sendJSONresponse(res, 500, err);
            return;
        }
    
        if (!recipe || !recipe.reviews || recipe.reviews.length === 0 || !recipe.reviews.id(req.params.reviewid)) {
            sendJSONresponse(res, 404, { "message": "recipe not found" });
            return;
        } 

        recipe.reviews.id(req.params.reviewid).remove();

        recipe.save(function(err){

            if (err) {
                sendJSONresponse(res, 500, err);
                return;
            } 

            updateAverageRating(recipe._id);

            sendJSONresponse(res, 204, null);
        });

    });

};