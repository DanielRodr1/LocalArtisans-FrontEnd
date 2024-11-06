import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PaymentInfo} from "../model/entity/DTOs/payment-info";
import {Observable} from "rxjs";
import {environmentLocal} from "../environments/environment.local";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private readonly endpoint: string = "/api/v1/payment"

  constructor(private _http: HttpClient) { }

  createPaymentIntent(paymentInfo: PaymentInfo): Observable<any> {
    const url = environmentLocal.API_URL + this.endpoint + '/payment-intent';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this._http.post<string>(url, paymentInfo, { headers });
  }

}
