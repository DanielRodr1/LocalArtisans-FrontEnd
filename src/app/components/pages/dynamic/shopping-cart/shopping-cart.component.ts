import {Component, OnInit} from '@angular/core';
import {Order} from "../../../../model/entity/Order";
import {CartService} from "../../../../service/cart-service";
import {CurrencyPipe, DecimalPipe, NgForOf, NgIf} from "@angular/common";
import {environmentLocalMicro} from "../../../../environments/environment.local.micro";
import {User} from "../../../../model/entity/User";
import {forkJoin, tap} from "rxjs";
import {RouterLink} from "@angular/router";
import {CartDataService} from "../../../../service/card-data.service";
import {IOrderProduct} from "../../../../model/interface/IOrderProduct";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    DecimalPipe,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {

  cart: Order | null = null;
  public user: User | null = null;
  totalAmount: number = 0;

  constructor(private cartDataService: CartDataService, private cartService: CartService) {}

  ngOnInit(): void {
    this.loadUserFromSession();
    this.loadCart();
  }

  loadCart(): void {
    if (this.user && this.user.userId) {
      console.log('Loading cart for user:', this.user);
      const userId = this.user.userId;
      this.cartService.getCartByUser(userId).subscribe({
        next: (order: Order) => {
          this.cart = order;
          this.totalAmount = 0; // Reset total amount before recalculating

          let productDetailRequests = this.cart.orderProducts.map(op => {
            return this.cartService.getProductDetails(op.productId).pipe(
              tap(productInfo => {
                op.productDetails = productInfo;
                this.totalAmount += op.quantity * productInfo.price; // Calculate total price
              })
            );
          });

          // Subscribe to all detail products solicitudes
          forkJoin(productDetailRequests).subscribe({
            next: () => {
              console.log('Total amount calculated:', this.totalAmount);
              // Sent total amount to CardData service
              this.cartDataService.setTotalAmount(this.totalAmount);
            },
            error: (error) => console.error('Error fetching product details:', error)
          });
        },
        error: (error) => console.error('Error loading cart:', error)
      });
    } else {
      console.error('User is not logged in or userId is missing');
    }
  }

  increaseQuantity(productId: number): void {
    if (this.user) {
      const userId = this.user.userId;
      this.cartService.addProductToCart(userId, productId, 1).subscribe({
        next: (response) => {
          console.log('Respuesta:', response);
          this.loadCart(); // Refresh the page
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    }
  }

  decreaseQuantity(productId: number): void {
    if (this.user) {
      const userId = this.user.userId;
      this.cartService.removeProductFromCart(userId, productId, 1).subscribe({
        next: (response) => {
          console.log('Response:', response);
          this.loadCart();
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    }
  }

  removeProduct(productId: number): void {
    if (this.user) {
      const userId = this.user.userId;
      this.cartService.removeProductFromCart(userId, productId, 999).subscribe({
        next: () => this.loadCart(),
        error: (error) => console.error('Error removing product:', error)
      });
    }
  }

  private loadUserFromSession(): void {
    let userLogin = sessionStorage.getItem("userLogin");
    if (userLogin) {
      try {
        this.user = JSON.parse(userLogin);
        // Verify is this.user is valid
        /*if (this.user && this.user.email) {
          console.log('User retrieved from session:', this.user);
        } else {
          console.warn('Invalid user structure in session:', this.user);
          this.user = null;
        }*/
      } catch (error) {
        console.error("Error parsing userLogin JSON:", error);
        this.user = null;
      }
    } else {
      console.warn('No user found in session storage');
    }
  }


  protected readonly environmentLocalMicro = environmentLocalMicro;

}
