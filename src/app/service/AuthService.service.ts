import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, throwError} from "rxjs";
import {environmentLocal} from "../environments/environment.local";
import {Router} from "@angular/router";
import {LoginRequest} from "../model/views/login-request";
import {ILoginResponse} from "../model/interface/ILoginResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private readonly endpoint: string = "/api/v1/user"

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(private _http: HttpClient, private router: Router) {
    const userLogin = sessionStorage.getItem("userLogin");
    if (userLogin) {
      this.isLoggedIn.next(true);
    }
  }

  public login(loginRequest: LoginRequest): Observable<ILoginResponse> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this._http.post<ILoginResponse>(
      environmentLocal.API_URL + this.endpoint + '/login', loginRequest,
      { headers: headers }
    )
    .pipe(catchError(this.errors));
  }

  public setLoginStatus(status: boolean): void {
    this.isLoggedIn.next(status);
  }

  public logout(){
    sessionStorage.removeItem('userLogin');
    console.log("Logged out user");
    this.setLoginStatus(false);
    this.router.navigate(['/home-page']);
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
