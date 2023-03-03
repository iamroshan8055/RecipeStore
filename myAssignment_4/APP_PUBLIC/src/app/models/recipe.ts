import { Component, OnInit } from "@angular/core";
import { Ingredients } from "./ingredients";
import { Reviews } from "./reviews";

export class Recipe {
    _id: string = '';
    rec_name: string = '';
    rec_img_URL: string= '';
    rec_detail: string = '';
    likes: number = 0;
    ingredients: Ingredients[] = [];
    dish_type: string = "";
    reviews: Reviews[] = [];
}
