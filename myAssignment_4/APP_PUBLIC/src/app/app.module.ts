import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrameworkComponent } from './framework/framework.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { CreateComponent } from './create/create.component';
import { AboutComponent } from './about/about.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { AddReviewsComponent } from './add-reviews/add-reviews.component';
import { DisplayComponent } from './display/display.component';
import { DeleteRecipeComponent } from './delete-recipe/delete-recipe.component'; 

import { APP_BASE_HREF} from '@angular/common';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FrameworkComponent,
    RecipeListComponent,
    CreateComponent,
    AboutComponent,
    HomepageComponent,
    DetailsPageComponent,
    EditRecipeComponent,
    AddReviewsComponent,
    DisplayComponent,
    DeleteRecipeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomepageComponent
      }, 
      {
        path: 'list',
        component: RecipeListComponent
      }, 
      {
        path: 'about',
        component: AboutComponent
      }, 
      {
        path: 'new', 
        component: CreateComponent 
      }, 
      {
        path: 'display',
        component: DisplayComponent
      }, 
      { 
        path: 'recipes/:recipeid', 
        component: DetailsPageComponent 
      }, 
      { 
        path: 'edit/:recipeid', 
        component: EditRecipeComponent 
      }, 
      { 
        path: 'delete/:recipeid', 
        component: DeleteRecipeComponent 
      }, 
      { 
        path: 'recipe/:recipeid/review', 
        component: AddReviewsComponent 
      },
      {
        path: '**', pathMatch: 'full', redirectTo: '/'
      }
        
      ])
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
