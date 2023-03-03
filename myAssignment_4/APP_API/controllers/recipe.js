var mongoose = require('mongoose');
var Recipe = mongoose.model('recipe');

module.exports.getRecipes = function(req, res) {
    Recipe.find().exec(function (err, recipedata){
        if(err){
            res
            .status(404)
            .json(err);
        return;
        }
        res
        .status(200)
        .json(recipedata);
    });
};

module.exports.createRecipe = function(req, res) {
    Recipe.create({
        rec_name:req.body.rec_name,
        rec_img_URL:req.body.rec_img_URL,
        rec_detail:req.body.rec_detail,
        likes:req.body.likes,
        dish_type:req.body.dish_type,

    }, function (err,recipedata) {
            if(err){
                res
                .status(400)
                .json(err);
            }else{
                res
                .status(201)
                .json(recipedata);
            }
    });
};

module.exports.getSingleRecipe = function(req, res) {
    if (req.params && req.params.recipeid) {
        Recipe
            .findById(req.params.recipeid)
            .exec((err, Recipe) => {
                if (!Recipe) {
                    res
                        .status(404)
                        .json({
                            "message": "recipeid not found"
                        });
                    return;
                } else if (err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }
                res
                    .status(200)
                    .json(Recipe);
            });
    } else {
        res
            .status(404)
            .json({
                "message": "No recipeid in request"
            });
    }
};

module.exports.updateRecipe = function(req, res){
    if(!req.params.recipeid){
        res
        .status(404)
        .json({
            "message":"Not found, recipeid is required"
        });
        return;
    }
    Recipe.findById(req.params.recipeid)
        .exec((err, recipedata) => {
        if (!recipedata) {
        res
        .status (404)
        .json ({
            "message": "recipeid not found"
        });
        return;
        } else if (err){
            res
            .status (400)
            .json(err);
            return;
        }
        recipedata.rec_name=req.body.rec_name,
        recipedata.rec_img_URL=req.body.rec_img_URL,
        recipedata.rec_detai=req.body.rec_detail,
        recipedata.likes=req.body.likes,
        recipedata.dish_type=req.body.dish_type,

        recipedata.save (function (err, recipedata) {
            if (err) {
                res
                .status (404)
                .json(err);
            }else {
                res
                .status (200)
                .json (recipedata);
            }
        });
    }); 
};

module.exports.deleteRecipe = function(req, res) {
    const recipeid = req.params.recipeid;

    if(recipeid){
        Recipe
        .findByIdAndRemove(recipeid)
        .exec((err,recipedata) => {
            if(err){
                res
                .status(404)
                .json(err);
            return;
            }
        res
        .status(201)
        .json({"message":"Data has been deleted successfully!"});
        });
    } else{
        res
        .status(404)
        .json({"message":"No recipeid"});
    }};

// module.exports = {
//     getRecipes,
//     createRecipe,
//     getSingleRecipe,
//     updateRecipe,
//     deleteRecipe,
// }