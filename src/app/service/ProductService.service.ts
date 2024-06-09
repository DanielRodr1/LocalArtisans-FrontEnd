import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Product} from "../model/entity/Product";
import {catchError, Observable, throwError} from "rxjs";
import {environmentLocalMicro} from "../environments/environment.local.micro";

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private readonly endpoint: string = "/api/v1/product"

  constructor(private _http: HttpClient) { }

  public createProduct(product: Product, categoryId: number, userId: number): Observable<Product> {

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this._http
      .post<Product>(
        environmentLocalMicro.API_URL + this.endpoint + `/create/${categoryId}/${userId}`, // Url
        product.toJSON(), // Body
        { headers: headers } // Cabeceras HTTP
      )
      .pipe(catchError(this.errors));
  }

  public findAllProducts():Observable<Product[]>{
    return this._http
      .get<Product[]>(environmentLocalMicro.API_URL + this.endpoint + '/findAllProducts')
      .pipe(catchError(this.errors));
  }

  public findById(productId: number):Observable<Product>{
    return this._http
      .get<Product>(environmentLocalMicro.API_URL + this.endpoint + `/${productId}`)
      .pipe(catchError(this.errors));
  }

  private errors(error: HttpErrorResponse) {

    console.log(error);
    let message = error.message;

    if (error.error instanceof HttpErrorResponse) message = error.error.message;
    else message = error.message;

    return throwError(() => {
      new Error(message)
    });

  }

}
