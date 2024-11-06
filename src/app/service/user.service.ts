import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {User} from "../model/entity/User";
import {environmentLocal} from "../environments/environment.local";
import {Order} from "../model/entity/Order";
import {Review} from "../model/entity/review";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Endpoint to access the Backend
  private readonly apiUrl: string = `${environmentLocal.API_URL}/api/v1/user`

  // Constructor with HttpClient
  constructor(private _http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${this.apiUrl}/all`).pipe(catchError(this.handleError));
  }

  getUserById(userId: number): Observable<User> {
    return this._http.get<User>(`${this.apiUrl}/one/${userId}`).pipe(catchError(this.handleError));
  }

  getUserByEmail(email: string): Observable<User> {
    return this._http.get<User>(`${this.apiUrl}/email/${email}`).pipe(catchError(this.handleError));
  }

  createUser(user: User): Observable<User> {
    return this._http.post<User>(`${this.apiUrl}/create`, user,{
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    }).pipe(catchError(this.handleError));
  }

  updateUser(user: User): Observable<User> {
    return this._http.put<User>(`${this.apiUrl}/update`, user).pipe(catchError(this.handleError));
  }

  deleteUser(userId: number): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/delete/${userId}`).pipe(catchError(this.handleError));
  }

  uploadProfileImage(userId: number, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this._http.post<string>(`${this.apiUrl}/${userId}/profile-image`, formData).pipe(catchError(this.handleError));
  }

  getProfileImage(userId: number): Observable<Blob> {
    return this._http.get(`${this.apiUrl}/${userId}/profile-image`, { responseType: 'blob' }).pipe(catchError(this.handleError));
  }

  getAllUserOrders(userId: number): Observable<Order[]> {
    return this._http.get<Order[]>(`${this.apiUrl}/allOrder/${userId}`).pipe(catchError(this.handleError));
  }

  getAllUserReviews(userId: number): Observable<Review[]> {
    return this._http.get<Review[]>(`${this.apiUrl}/allReview/${userId}`).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }

}
