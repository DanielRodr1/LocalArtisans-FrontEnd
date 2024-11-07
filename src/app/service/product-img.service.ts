import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environmentLocalMicro} from "../environments/environment.local.micro";
import {ProductImg} from "../model/entity/ProductImg";

@Injectable({
  providedIn: 'root'
})
export class ProductImgService {

  private readonly apiUrl: string = `${environmentLocalMicro.API_URL}/api/v1/productImg`

  constructor(private _http: HttpClient) { }

    uploadImage(productId: number, file: File, isPrimary: boolean): Observable<string> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('productID', productId.toString());
        formData.append('isPrimary', isPrimary.toString());

        return this._http.post<string>(`${this.apiUrl}/upload`, formData);
    }

  deleteImage(productId: number, productImgId: number): Observable<string> {
    return this._http.delete<string>(`${this.apiUrl}/delete?productID=${productId}&productImgId=${productImgId}`,{
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });
  }

  getImagesByProductId(productId: number): Observable<ProductImg[]> {
    return this._http.get<ProductImg[]>(`${this.apiUrl}/product/${productId}`,{
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });
  }

  getPhoto(filename: string): Observable<Blob> {
    return this._http.get(`${this.apiUrl}/${filename}`, {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      },
      responseType: 'blob'
    });
  }

  setPrimaryImage(productId: number, imageId: number): Observable<string> {
    return this._http.patch<string>(`${this.apiUrl}/${productId}/images/${imageId}/set-primary`, null,{
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });
  }

}
