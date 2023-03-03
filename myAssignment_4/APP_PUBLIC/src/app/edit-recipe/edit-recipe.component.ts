import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeServiceService } from "../recipe-service.service";
import { ActivatedRoute,Router, Params } from '@angular/router';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {

  public editRecipe: Recipe = {
    _id: '',
    rec_name: '',
    rec_img_URL: '',
    rec_detail: '',
    likes: 0,
    ingredients: [],
    dish_type: '',
    reviews: []
  };

  constructor(private recipeService: RecipeServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    var recipeid = this.route.snapshot.paramMap.get('recipeid');

    this.recipeService.getSingleRecipe(recipeid as string)
      .then(recipe => {
        this.editRecipe = recipe as Recipe;

      });

  }

  public updateNewRecipe(editRecipe: Recipe): void{

    const recipeid = this.route.snapshot.paramMap.get('recipeid');
    this.recipeService.updateRecipe(recipeid as string,editRecipe)
    .then(editRecipe => {
      if (editRecipe) {
        this.router.navigate([`/list`]);
      }
    });
  }

}
