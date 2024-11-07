import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../../../service/product.service";
import {Product} from "../../../../model/entity/Product";
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs";
import {Category} from "../../../../model/entity/Category";
import {CategoryService} from "../../../../service/category.service";
import {NgForOf} from "@angular/common";
import {User} from "../../../../model/entity/User";
import {ProductImgService} from "../../../../service/product-img.service";
import {ProductImg} from "../../../../model/entity/ProductImg";

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

  public products: Product[]; //Podría emitirse
  public productId: number;
  public name: string;
  public description: string;
  public image: string;
  public price: number;
  public categoryId: number;
  public userId: number;
  public categories: Category[];
  public selectedFiles: File[] = [];
  public productImages: ProductImg[] = [];

  public constructor(private _productService: ProductService, private _categoryService: CategoryService, private _productImgService: ProductImgService) {
    this.products = [];
    this.productId = 0;
    this.name = '';
    this.description = '';
    this.image = '';
    this.price = 0;
    this.categoryId = 0;
    this.userId = 0;
    this.categories = [];
    this.selectedFiles = [];
    this.productImages = [];
  }

  public ngOnInit() {
    this.getAllCategories();
    this.setUserIdFromSession();
    console.log("Inicialización - categoryId:", this.categoryId); // Depuración

  }

  // private setUserIdFromSession() {
  //   let userLogin = sessionStorage.getItem("userLogin");
  //   if (userLogin) {
  //     try {
  //       let userLoginParse = JSON.parse(userLogin);
  //       this.userId = userLoginParse.userId;
  //     } catch (error) {
  //       console.error("Error al analizar el JSON de userLogin:", error);
  //     }
  //   }
  // }

  private setUserIdFromSession() {
    const userLogin = sessionStorage.getItem("userLogin");
    if (userLogin) {
      try {
        const userLoginParse = JSON.parse(userLogin);
        this.userId = userLoginParse.userId;
      } catch (error) {
        console.error("Error al analizar el JSON de userLogin:", error);
      }
    } else {
      console.warn("No se encontró la sesión de usuario.");
    }
  }

  // public onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     const formData = new FormData();
  //     formData.append('file', file);
  //
  //     this._productService.uploadImage(formData).subscribe(
  //       (response: string) => {
  //         this.image = response; // Guardar la URL de la imagen directamente desde la respuesta
  //       },
  //       (error) => {
  //         console.error('Error al subir la imagen:', error);
  //         // Manejar el error adecuadamente, por ejemplo, mostrar un mensaje al usuario
  //       }
  //     );
  //   }
  // }

  public onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.selectedFiles = Array.from(files);
    console.log("Archivos seleccionados:", this.selectedFiles);
  }

  public crearProducto(): void {
    console.log("Preparación - categoryId:", this.categoryId);
    if (!this.categoryId) {
      console.error("No se ha seleccionado una categoría.");
      return;
    }

    if (this.categoryId && this.userId) {
      let product: Product = new Product();
      product.name = this.name;
      product.description = this.description;
      product.price = this.price;
      product.userId = this.userId;
      product.category = this.categories.find(cat => cat.id === this.categoryId) || null;

      console.log("Creando producto:", product);

      this._productService.createProduct(product, this.categoryId, this.userId).subscribe({
        next: (createdProduct: Product) => {
          console.log("Producto creado con éxito:", createdProduct);
          this.products.push(createdProduct);
          this.productId = createdProduct.id; // Usa `id`
          console.log("ProductId asignado:", this.productId);

          // Llama a la función para subir las imágenes seleccionadas
          this.uploadSelectedFiles();

          this.resetForm();
        },
        error: (error) => {
          console.error("Error al crear el producto:", error);
          alert(error.message);
        }
      });
    } else {
      console.error("Faltan el categoryId o el userId para crear el producto.");
    }
  }



  private resetForm(): void {
    this.name = '';
    this.price = 0;
    this.description = '';
    this.categoryId = 0;
  }

  public getAllCategories() {
    this._categoryService.findAllCategory().subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
        console.log("Categorías cargadas:", this.categories);
        if (this.categories.length > 0) {
          this.categoryId = this.categories[0].id; // Valor por defecto
        }
        console.log("Valor inicial de categoryId:", this.categoryId);
      },
      error: (error) => {
        console.error("Error al cargar categorías:", error);
      }
    });
  }

  public onCategoryChange(event: any) {
    this.categoryId = Number(event.target.value); // Conversión a número
    console.log("CategoryId seleccionado:", this.categoryId);
  }

  private uploadSelectedFiles(): void {
    console.log("Intentando subir imágenes con productId:", this.productId); // Depuración adicional

    if (!this.productId) {
      console.error("No se puede subir la imagen: productId no está definido.");
      return;
    }

    if (this.selectedFiles.length > 0) {
      this.selectedFiles.forEach((file, index) => {
        const isPrimary = index === 0; // Marca la primera imagen como principal

        this._productImgService.uploadImage(this.productId, file, isPrimary).subscribe(
            (response: string) => {
              console.log(`Imagen subida con éxito: ${response}`);
            },
            (error) => {
              console.error("Error al subir la imagen:", error);
            }
        );
      });
      this.selectedFiles = []; // Limpia los archivos seleccionados después de subir
    } else {
      console.warn("No se seleccionaron archivos para subir.");
    }
  }

}
