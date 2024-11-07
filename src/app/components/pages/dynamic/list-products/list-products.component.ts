import {Component, OnInit} from '@angular/core';
import {Category} from "../../../../model/entity/Category";
import {Product} from "../../../../model/entity/Product";
import {FormsModule} from "@angular/forms";
import {CategoryService} from "../../../../service/category.service";
import {Observable} from "rxjs";
import {NgForOf, NgIf} from "@angular/common";
import {ProductService} from "../../../../service/product.service";
import {RouterLink} from "@angular/router";
import {ProductImg} from "../../../../model/entity/ProductImg";
import {CartService} from "../../../../service/cart-service";

@Component({
  selector: 'app-list-products',
  standalone: true,
    imports: [
        FormsModule,
        NgForOf,
        RouterLink,
        NgIf
    ],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent implements OnInit {

  public products: Product[];
  public rows: Product[][];
  public categoryId: number;
  public categories: Category[];
  public userId: number | null = null

  public constructor(private _productService: ProductService , private _categoryService: CategoryService, private cartService: CartService) {
    this.products = [];
    this.rows = [];
    this.categoryId = 0;
    this.categories = [];
  }

  public ngOnInit() {
    this.loadUserFromSession(); // Cargar ID del usuario si está logueado
    this.getAllCategories();
    this.getAllProducts();
  }

  // public getAllProducts() {
  //   let observable: Observable<Product[]> = this._productService.findAllProducts();
  //   observable.subscribe({
  //     next: (products: Product[])=> {
  //       console.log('Productos cargados:', products);
  //       this.products = products.map(product => {
  //         product.image = 'http://localhost:8080' + product.image; // Ajusta la URL base del backend según tu configuración
  //         return product;
  //       });
  //       this.createRows();
  //     },
  //     error: (error): void => {
  //       this.products = [];
  //       console.log(error);
  //     }
  //   });
  // }

    private loadUserFromSession(): void {
        const userLogin = sessionStorage.getItem("userLogin");
        if (userLogin) {
            try {
                const user = JSON.parse(userLogin);
                this.userId = user.userId; // Asigna el userId si el usuario está logueado
            } catch (error) {
                console.error("Error al analizar el JSON de userLogin:", error);
            }
        } else {
            console.warn('Usuario no logueado');
        }
    }

    addToCart(productId: number): void {
        if (this.userId) {
            this.cartService.addProductToCart(this.userId, productId, 1).subscribe({
                next: () => {
                    console.log('Producto añadido al carrito');
                },
                error: (error) => {
                    console.error('Error al añadir al carrito:', error);
                }
            });
        } else {
            console.warn('Debe iniciar sesión para añadir productos al carrito.');
            // Puedes agregar lógica para redirigir al usuario a la página de inicio de sesión o mostrar un mensaje de alerta
        }
    }

    public getAllProducts() {
        this._productService.findAllProducts().subscribe({
            next: (products: Product[]) => {
                this.products = products;
                console.log("Productos cargados con imágenes:", this.products); // Verificación
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

    // Método para obtener la URL de la imagen principal de un producto
    public getPrimaryImage(product: Product): string | undefined {
        const primaryImage = product.images.find(img => img.isPrimary);
        console.log("Imagen principal para el producto:", product.id, primaryImage);
        return primaryImage ? primaryImage.url : undefined;
    }


}
