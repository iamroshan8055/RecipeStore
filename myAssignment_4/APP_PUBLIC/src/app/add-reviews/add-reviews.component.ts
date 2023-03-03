import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Reviews } from '../models/reviews';
import { RecipeServiceService } from "../recipe-service.service";

@Component({
  selector: 'app-add-reviews',
  templateUrl: './add-reviews.component.html',
  styleUrls: ['./add-reviews.component.css'],
  providers: [RecipeServiceService]
})
export class AddReviewsComponent implements OnInit {

  public recipeid = this.route.snapshot.paramMap.get('recipeid');

  public newReviews: Reviews = {
    _id: '',
    user_name: '',
    rating: 5,
    reviewText: ''
  }

  formError = '';

  // constructor() {  }

  constructor( private recipeService: RecipeServiceService, private router: Router,  private route: ActivatedRoute) {  }

  ngOnInit(): void {
    
  }

  onReviewSubmit() {

    this.formError = '';

    if (this.isFormValid()) {

      this.recipeService.addReviewToRecipe(this.recipeid as string, this.newReviews)
        .then(addReviews => {
          if (addReviews) {
            this.router.navigate(['/recipes/'+this.recipeid]);
          } else {
            this.formError = 'Ops, something wrong happened. Tryagain later';
            console.log("Ops, something wrong happened. Tryagain later");
          }
        });

    } else {
      this.formError = 'All fields are required. Please, try again.';
      console.log("All fields are required. Please, try again.");
    }  

  }

  isFormValid(): boolean {
    if (this.newReviews.user_name && this.newReviews.rating && this.newReviews.reviewText)
      return true;
    return false; 
  }

}
