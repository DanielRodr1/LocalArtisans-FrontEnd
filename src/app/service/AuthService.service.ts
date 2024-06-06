import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environmentLocal} from "../environments/environment.local";
import {LoginResponse} from "../model/views/LoginResponse";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private readonly endpoint: string = "/api/v1/artesanos"

  constructor(private _http: HttpClient, private router: Router) { }

  public login(userResponse: LoginResponse): Observable<LoginResponse>{

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; chatset=utf-8');

    return this._http
      .post<LoginResponse>(
        environmentLocal.API_URL + this.endpoint + '/login',
        userResponse.toJSON(),
        {headers: headers}
      )
      .pipe(catchError(this.errors));
  }

  public logout(){
    sessionStorage.removeItem('userLogin');
    console.log("Usuario desdlogeado");
    this.router.navigateByUrl('/login')
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
