import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Category} from "../model/entity/Category";
import {Product} from "../model/entity/Product";
import {environmentLocalMicro} from "../environments/environment.local.micro";

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  private readonly endpoint : string = "/category"

  constructor(private _http: HttpClient) { }

  public findAllCategory():Observable<Category[]>{
    return this._http
      .get<Category[]>(environmentLocalMicro.API_URL + this.endpoint + '/findAll')
      .pipe(catchError(this.errors));
  }

  public findProductByCategory(categoryId: number): Observable<Product[]>{
    return this._http
      .get<Product[]>(environmentLocalMicro.API_URL + this.endpoint + `/listProducts/${categoryId}`)
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
