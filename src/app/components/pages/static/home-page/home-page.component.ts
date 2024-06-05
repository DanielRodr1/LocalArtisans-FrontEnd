import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Category} from "../../../../model/entity/Category";
import {CategoryServiceService} from "../../../../service/CategoryService.service";
import {Observable} from "rxjs";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{

  public categories: Category[];
  public slides : Category[][];

  constructor(private _categoryService: CategoryServiceService) {
    this.categories = [];
    this.slides = [];
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  public getAllCategories(){

    let observable: Observable<Category[]> = this._categoryService.findAllCategory();
    observable.subscribe({
      next: (categories: Category[])=> {
        this.categories = categories;
        this.createSlides();
      },
      error: (error): void => {
        this.categories = [];
        console.log(error);
      }
    });
  }

  private createSlides(): void {
    this.slides = [];
    for (let i = 0; i < this.categories.length; i += 4) {
      this.slides.push(this.categories.slice(i, i + 4));
    }
  }

}
