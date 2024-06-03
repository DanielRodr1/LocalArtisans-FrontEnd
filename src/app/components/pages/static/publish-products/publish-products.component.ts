import {Component, OnInit} from '@angular/core';
import {ProductServiceService} from "../../../../service/ProductService.service";
import {Product} from "../../../../model/entity/Product";
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs";
import {Category} from "../../../../model/entity/Category";
import {CategoryServiceService} from "../../../../service/CategoryService.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-publish-products',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './publish-products.component.html',
  styleUrl: './publish-products.component.css'
})
export class PublishProductsComponent implements OnInit{

  public products: Product[];
  public productId: number;
  public name: string;
  public description: string;
  public image: string;
  public price: number;
  public categoryId: number;
  public userId: number;
  public categories: Category[];

  public constructor(private _productService: ProductServiceService, private _categoryService: CategoryServiceService) {
    this.products = [];
    this.productId = 0;
    this.name = '';
    this.description = '';
    this.image = '';
    this.price = 0;
    this.categoryId = 0;
    this.userId = 2;
    this.categories = [];
  }

  public ngOnInit() {
    this.getAllCategories();
  }

  public crearProducto():void{

    let product: Product = new Product();

    product.name = this.name;
    product.description = this.description;
    product.image = this.image;
    product.price = this.price;
    product.userId = this.userId;
    this._productService
      .createProduct(product, this.categoryId, this.userId)
      .subscribe({
        next: (product: Product): void =>{
          this.products.push(product);
          this.resetForm();
        },
        error: (error): void => {
          alert(error.message);
        }
      });
  }

  private resetForm(): void{
    this.name = '';
    this.price = 0;
    this.description = '';
    this.categoryId = 0;
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

}
