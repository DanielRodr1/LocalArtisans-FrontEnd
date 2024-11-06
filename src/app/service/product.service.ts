import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Product} from "../model/entity/Product";
import {catchError, Observable, throwError} from "rxjs";
import {environmentLocalMicro} from "../environments/environment.local.micro";
import {ProductInfo} from "../model/entity/DTOs/product-info";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly apiUrl: string = `${environmentLocalMicro.API_URL}/api/v1/product`

  constructor(private _http: HttpClient) { }

  findById(productId: number): Observable<Product> {
    return this._http
      .get<Product>(`${this.apiUrl}/${productId}`,{
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      })
      .pipe(catchError(this.handleError));
  }

  getProductInfoById(productId: number): Observable<ProductInfo> {
    return this._http
      .get<ProductInfo>(`${this.apiUrl}/info/${productId}`,{
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      })
      .pipe(catchError(this.handleError));
  }

  createProduct(product: Product, categoryId: number, userId: number): Observable<Product> {
    return this._http
      .post<Product>(`${this.apiUrl}/create/${categoryId}/${userId}`, product,{
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      })
      .pipe(catchError(this.handleError));
  }

  updateProduct(product: Product, categoryId: number): Observable<Product> {
    return this._http
      .put<Product>(`${this.apiUrl}/update/${categoryId}`, product, {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      })
      .pipe(catchError(this.handleError));
  }

  deleteProduct(productId: number): Observable<void> {
    return this._http
      .delete<void>(`${this.apiUrl}/delete/${productId}`,{
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      })
      .pipe(catchError(this.handleError));
  }

  findAllProducts(): Observable<Product[]> {
    return this._http
      .get<Product[]>(`${this.apiUrl}/findAllProducts`,{
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      })
      .pipe(catchError(this.handleError));
  }

  findAllProductsByUserId(userId: number): Observable<Product[]> {
    return this._http
      .get<Product[]>(`${this.apiUrl}/usersProduct/${userId}`,{
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      })
      .pipe(catchError(this.handleError));
  }

  updateProductsToInactive(userId: number): Observable<void> {
    return this._http
      .put<void>(`${this.apiUrl}/userDelete/${userId}`, null,{
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    let message = error.message;

    if (error.error instanceof HttpErrorResponse) {
      message = error.error.message;
    } else {
      message = error.message;
    }

    return throwError(() => new Error(message));
  }

}
