import { Injectable } from '@angular/core';
import {environmentLocal} from "../environments/environment.local";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Order} from "../model/entity/Order";
import {HttpClient} from "@angular/common/http";
import {ProductInfo} from "../model/entity/DTOs/product-info";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly apiUrl: string = `${environmentLocal.API_URL}/api/v1/cart`

  // Event for counting Cart items
  private cartItemCount = new BehaviorSubject<number>(0);
  // Observable as counter
  cartItemCount$ = this.cartItemCount.asObservable();

  constructor(private _http: HttpClient) {}

  addProductToCart(userId: number, productId: number, quantity: number): Observable<string> {
    return this._http.post<string>(`${this.apiUrl}/add`, null, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      },
      params: {
        userId: userId.toString(),
        productId: productId.toString(),
        quantity: quantity.toString()
      },
      responseType: 'text' as 'json',
    }).pipe(
      tap(() => {
        this.updateCartItemCount(userId); // Update the cart count after adding a product
      })
    );
  }

  removeProductFromCart(userId: number, productId: number, quantity: number): Observable<string> {
    return this._http.post<string>(`${this.apiUrl}/remove`, null, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      },
      params: {
        userId: userId.toString(),
        productId: productId.toString(),
        quantity: quantity.toString()
      },
      responseType: 'text' as 'json',
    }).pipe(
      tap(() => {
        this.updateCartItemCount(userId); // Update the cart count after removing a product
      })
    );
  }

  getCartByUser(userId: number): Observable<Order> {
    return this._http.get<Order>(`${this.apiUrl}/${userId}`,{
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });
  }

  checkoutFromCart(userId: number, totalAmount: number, deliveryDetails: {
    deliveryAddress: string;
    deliveryCity: string;
    deliveryPostalCode: string;
  }): Observable<Order> {
    const payload = {
      userId: userId,
      totalAmount: totalAmount,
      deliveryAddress: deliveryDetails.deliveryAddress,
      deliveryCity: deliveryDetails.deliveryCity,
      deliveryPostalCode: deliveryDetails.deliveryPostalCode
    };

    return this._http.post<Order>(`${this.apiUrl}/checkout`, payload, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });
  }



  getProductDetails(productId: number): Observable<ProductInfo> {
    return this._http.get<ProductInfo>(`${this.apiUrl}/info/${productId}`,{
      headers: {
        'ngrok-skip-browser-warning': 'true'
      },
    });
  }

  // Method to update cart item count
  updateCartItemCount(userId: number): void {
    this.getCartByUser(userId).subscribe((order) => {
      const itemCount = order.orderProducts.reduce((total, orderProduct) => total + orderProduct.quantity, 0);
      this.cartItemCount.next(itemCount);
    });
  }

}
