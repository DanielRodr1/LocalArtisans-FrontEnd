import {Component, OnInit} from '@angular/core';
import {Category} from "../../../../model/entity/Category";
import {Product} from "../../../../model/entity/Product";
import {FormsModule} from "@angular/forms";
import {CategoryServiceService} from "../../../../service/CategoryService.service";
import {Observable} from "rxjs";
import {NgForOf} from "@angular/common";
import {ProductServiceService} from "../../../../service/ProductService.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit{

  public products: Product[];
  public rows: Product[][];
  public categoryId: number;
  public categories: Category[];

  public constructor(private _productService: ProductServiceService ,private _categoryService: CategoryServiceService) {
    this.products = [];
    this.rows = [];
    this.categoryId = 0;
    this.categories = [];
  }

  public ngOnInit() {
    this.getAllCategories();
    this.getAllProducts();
  }

  public getAllProducts(){
    let observable: Observable<Product[]> = this._productService.findAllProducts();
    observable.subscribe({
      next: (products: Product[])=> {
        console.log('Productos cargados:', products);
        this.products = products;
        this.createRows();
      },
      error: (error): void => {
        this.products = [];
        console.log(error);
      }
    });
  }

  public findProductByCategory(): void{
    this.categoryId = Number(this.categoryId);
    console.log('findProductByCategory llamado, categoryId:', this.categoryId);
    if (this.categoryId !== 0){
      let observable: Observable<Product[]> = this._categoryService.findProductByCategory(this.categoryId);
      observable.subscribe({
        next: (products: Product[])=>{
          this.products = products;
          this.createRows();
        },
        error: (error): void => {
          this.categories = [];
          console.log(error);
        }
      });
    } else{
      console.log('Cargando todos los productos');
      this.getAllProducts();
    }
  }

  public getAllCategories(){

    let observable: Observable<Category[]> = this._categoryService.findAllCategory();
    observable.subscribe({
      next: (categories: Category[])=> {
        this.categories = categories;
      },
      error: (error): void => {
        this.categories = [];
        console.log(error);
      }
    });
  }

  private createRows(): void {
    this.rows = [];
    for (let i = 0; i < this.products.length; i += 3) {
      this.rows.push(this.products.slice(i, i + 3));
    }
  }


}
