import { Injectable } from '@angular/core';
import { Recipe} from './models/recipe';
import { Reviews } from './models/reviews';
// import { Ingredients } from './models/ingredients';
import {HttpClient, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {

  private recipesUrl = 'http://localhost:3000/api/recipes';
  constructor(private http:HttpClient){}

  getRecipes() : Promise<void | Recipe[]>{

    return this.http.get(this.recipesUrl)
     .toPromise()
     .then(response => response as Recipe[])
     .catch(this.handleError);
   }

   getSingleRecipe(recipeId: string): Promise<void | Recipe>{ 
     return this.http.get(this.recipesUrl + '/' + recipeId) 
       .toPromise() 
       .then(response => response as Recipe) 
       .catch(this.handleError); 
   }
   
   createRecipe(newRecipe: Recipe): Promise<void | Recipe> { 
     return this.http.post(this.recipesUrl, newRecipe) 
       .toPromise() 
       .then(response => response as Recipe) 
       .catch(this.handleError); 
   }

   updateRecipe(recipeId: string, editRecipe: Recipe): Promise<void | Recipe>{ 
    return this.http.put(this.recipesUrl + '/' + recipeId, editRecipe) 
      .toPromise() 
      .then(response => response as Recipe) 
      .catch(this.handleError); 
  }

  deleteRecipe(recipeId: string): Promise<void | Recipe>{ 
    return this.http.delete(this.recipesUrl + '/' + recipeId) 
      .toPromise() 
      .then(response => response as Recipe) 
      .catch(this.handleError); 
  }

  addReviewToRecipe(recipeId: string, addReviews: Reviews): Promise<void | Reviews>{
    return this.http.post(this.recipesUrl + '/' + recipeId+'/reviews', addReviews)
    .toPromise() 
    .then(response => response as Reviews) 
    .catch(this.handleError); 
  }

   private handleError(error: any){
     console.log("error");
 }

}
