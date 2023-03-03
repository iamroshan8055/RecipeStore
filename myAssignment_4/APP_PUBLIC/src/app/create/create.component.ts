import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from '../models/recipe';
import { RecipeServiceService } from "../recipe-service.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [RecipeServiceService]
})
export class CreateComponent implements OnInit {

  public newRecipe: Recipe = {
    _id: '',
    rec_name: '',
    rec_img_URL: '',
    rec_detail: '',
    likes: 0,
    ingredients: [],
    dish_type: '',
    reviews: []
  };

  constructor( private recipeService: RecipeServiceService, private route: Router) {  }

  ngOnInit(): void {
  }

  public createNewRecipe(newRecipe: Recipe): void{
    this.recipeService.createRecipe(newRecipe)
    .then(recipe => {
      if (recipe) {
        this.route.navigate([`/list`]);
      }
    });
  }

  upload(fakepath: string){
    console.log(fakepath);
    var splits = fakepath.split('fakepath\\');
    alert(splits[1]);
  };

}
