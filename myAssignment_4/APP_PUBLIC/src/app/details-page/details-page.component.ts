import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeServiceService } from "../recipe-service.service";
import { switchMap } from 'rxjs/operators'; 
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css'],
  providers: [RecipeServiceService]
})
export class DetailsPageComponent implements OnInit {

  currentRecipe: Recipe = new Recipe; 
  pghdr: string[] = ["Recipes","  Our Recipe and your satisfaction.","Looking for delicious recipies? Recipe Store helps you to make tempting and delicious food. Perhaps with perfect platting garnishing techniques. Let Recipe Store help you cook mouth-watering food."];

  constructor( private recipeService: RecipeServiceService, private route: ActivatedRoute) {  }

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) => { 
      return this.recipeService.getSingleRecipe(params['recipeid']); 
    })) 
      .subscribe((currentRecipe: any) => { 
        console.log('Selected Recipe', currentRecipe); 
        this.currentRecipe = currentRecipe; 
        this.pghdr;
      });

  }
}
