import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartDataService {
  private totalAmount: number = 0;

  setTotalAmount(amount: number): void {
    this.totalAmount = amount;
  }

  getTotalAmount(): number {
    return this.totalAmount;
  }
}

