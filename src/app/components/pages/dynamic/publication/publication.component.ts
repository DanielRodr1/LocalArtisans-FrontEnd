import {Component, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Product} from "../../../../model/entity/Product";
import {ProductServiceService} from "../../../../service/ProductService.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {UserServiceService} from "../../../../service/UserService.service";
import {User} from "../../../../model/entity/User";

@Component({
  selector: 'app-publication',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './publication.component.html',
  styleUrl: './publication.component.css'
})
export class PublicationComponent implements OnInit{

  public product : Product;
  public user: User;
  private readonly productId : number;

  public constructor(private _productService: ProductServiceService, route: ActivatedRoute, private _userService: UserServiceService) {
    this.product = new Product();
    this.user = new User();
    this.productId = route.snapshot.params['productId'];
  }

  public ngOnInit() {
    this.findProductById(this.productId);
  }

  private findProductById(productId: number) :void {
    let observable: Observable<Product> = this._productService.findById(productId);
    observable.subscribe({
      next: (prod : Product) => {
        prod.image = 'http://localhost:8080' + prod.image;
        this.product = prod;
        console.log(this.product);
        if (prod.user) { // Verificar si el ID del usuario está definido
          this.user = prod.user;
          // this.findUserById(prod.userId);
        } else {
          console.log('El ID del usuario no está definido en el producto.');
        }
      },
      error: (error): void =>{
        this.product = new Product();
        console.log(error.message());
      }
    });
  }

  // private findUserById(userId: number): void{
  //   let observable: Observable<User> = this._userService.getUserById(userId);
  //   observable.subscribe({
  //     next: (usr: User) => {
  //       this.user = usr;
  //     },
  //     error: (error): void =>{
  //       this.user = new User();
  //       console.log(error.message());
  //     }
  //   });
  // }

}
