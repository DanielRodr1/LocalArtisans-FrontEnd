import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Category} from "../model/entity/Category";
import {environmentLocal} from "../environments/environment.local";

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  private readonly endpoint : string = "/api/v1/category"

  constructor(private _http: HttpClient) { }

  public findAllCategory():Observable<Category[]>{
    return this._http
      .get<Category[]>(environmentLocal.API_URL + this.endpoint + '/findAll')
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
