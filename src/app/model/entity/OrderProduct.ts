import {IOrderProduct} from "../interface/IOrderProduct";
import {IOrder} from "../interface/IOrder";
import {ProductInfo} from "./DTOs/product-info";

export class OrderProduct implements IOrderProduct {

  private _id: number;
  private _productId: number;
  private _quantity: number;
  private _order: IOrder | null;
  private _productDetails: ProductInfo | null;

  constructor(id?: number, productId?: number, quantity?: number, order?: IOrder, productDetails?: ProductInfo) {
    this._id = id ?? 0;
    this._productId = productId ?? 0;
    this._quantity = quantity ?? 0;
    this._order = order ?? null;
    this._productDetails = productDetails ?? null;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get productId(): number {
    return this._productId;
  }

  set productId(value: number) {
    this._productId = value;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }

  get order(): IOrder | null {
    return this._order;
  }

  set order(value: IOrder | null) {
    this._order = value;
  }

  get productDetails(): ProductInfo | null {
    return this._productDetails;
  }

  set productDetails(details: ProductInfo | null) {
    this._productDetails = details;
  }

  public toString():string{
    return JSON.stringify(this);
  }

}
