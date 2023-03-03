import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router, Params } from '@angular/router';
import { Recipe } from '../models/recipe';
import { RecipeServiceService } from "../recipe-service.service";

@Component({
  selector: 'app-delete-recipe',
  templateUrl: './delete-recipe.component.html',
  styleUrls: ['./delete-recipe.component.css']
})
export class DeleteRecipeComponent implements OnInit {

  constructor(private recipeService: RecipeServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.deleteRecipe();
  }

  public deleteRecipe() {
    const recipeid = this.route.snapshot.paramMap.get('recipeid');
    this.recipeService.deleteRecipe(recipeid as string)
      .then(() => this.router.navigate([`/list`])
    );
  }

}
