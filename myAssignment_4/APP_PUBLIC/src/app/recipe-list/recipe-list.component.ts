import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeServiceService } from "../recipe-service.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  providers: [RecipeServiceService]
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  pghdr: string[] = ["Recipes","  Our Recipe and your satisfaction.","Looking for delicious recipies? Recipe Store helps you to make tempting and delicious food. Perhaps with perfect platting garnishing techniques. Let Recipe Store help you cook mouth-watering food."];

  constructor( private recipeService: RecipeServiceService) {  }

  ngOnInit(): void {
    this.recipeService
      .getRecipes()
      .then(recipes => {
        this.recipes = recipes as Recipe[];
        this.pghdr;
        // this.formatreviews(recipes);
        
      });
   }

   shortDetails(details: string): string {
      return details.length > 40 ? details.substr(0, 40) + ' ...' : details;
   }

  //  private formatreviews(recipes: any) {
  //   for(let i = 0; i < this.recipes.length; i++) {
  //     var ratngs = 0;
  //     var j = 0;
  //     for(let j = 0; j < this.recipes[i].reviews.length; j++){
  //       ratngs++;
  //     }
  //     var rat = ratngs/j;
  //     return rat;
  //   }
  // }

}
