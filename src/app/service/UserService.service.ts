import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {User} from "../model/entity/User";
import {environmentLocal} from "../environments/environment.local";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  // Attributes
  private readonly endpoint: string = "/user"

  // Constructor with HttpClient
  constructor(private _http: HttpClient) { }

  // Methods
  public getAllUsers(): Observable<User[]>{
    return this._http.get<User[]>(environmentLocal.API_URL + this.endpoint + '/all');
  }

  public getUserById(userId: number): Observable<User>{
    return this._http.get<User>(environmentLocal.API_URL + this.endpoint + '/one/' + userId);
  }

  public createUser(user: User): Observable<User>{

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; chatset=utf-8');

    return this._http
      .post<User>(
        environmentLocal.API_URL + this.endpoint + '/create',
        user.toJSON(),
        {headers: headers}
      )
      .pipe(catchError(this.errors));
  }

  public updateUser(user: User): Observable<User>{

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; chatset=utf-8');

    return this._http
      .put<User>(
        environmentLocal.API_URL + this.endpoint + '/update',
        user.toJSON(),
        {headers: headers}
      )
      .pipe(catchError(this.errors));
  }

  public findByEmail(email: string): Observable<User>{
    console.log(email);
    return this._http
      .get<User>(
        environmentLocal.API_URL + this.endpoint + `/one/email/${email}`
      )
      .pipe(catchError(this.errors));
  }


  public deleteUser(userId: number): Observable<Object>{
    return this._http
      .delete( environmentLocal.API_URL + this.endpoint + '/delete/' + userId)
      .pipe(catchError(this.errors));

  }

  private errors(error: HttpErrorResponse){

    let message = error.message;

    if(error.error instanceof HttpErrorResponse) message = error.error.message;
    else {
      console.log(error);
      message = error.message;
    }

    return throwError(() => {
      new Error(message)
    });

  }

}
