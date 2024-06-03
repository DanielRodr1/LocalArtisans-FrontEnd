import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Product} from "../model/entity/Product";
import {catchError, Observable, throwError} from "rxjs";
import {environmentLocal} from "../environments/environment.local";

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
        environmentLocal.API_URL + this.endpoint + `/create/${categoryId}/${userId}`, // Url
        product.toJSON(), // Body
        { headers: headers } // Cabeceras HTTP
      )
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
