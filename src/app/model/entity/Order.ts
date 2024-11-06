import {IOrder} from "../interface/IOrder";

import {OrderStatus} from "./enums/order-status";
import {IUser} from "../interface/IUser";
import {IPayment} from "../interface/IPayment";
import {IOrderProduct} from "../interface/IOrderProduct";

export class Order implements IOrder {
  private _id: number;
  private _orderDate: Date;
  private _deliveryDate: Date;
  private _deliveryAddress: string;
  private _deliveryCity: string;
  private _deliveryPostalCode: string;
  private _deliveryPrice: number;
  private _total: number;
  private _discount: number;
  private _isCart: boolean;
  private _orderProducts: IOrderProduct[];
  private _user: IUser | null;
  private _payment: IPayment | null;
  private _orderStatus: OrderStatus;

  constructor(id?: number, orderDate?: Date, deliveryDate?: Date, deliveryAddress?: string, deliveryCity?: string, deliveryPostalCode?: string, deliveryPrice?: number, total?: number,
              discount?: number, isCart?: boolean, orderProducts?: IOrderProduct[], user?: IUser, payment?: IPayment, orderStatus?:OrderStatus) {
    this._id = id ? id:0;
    this._orderDate = orderDate ?? new Date();
    this._deliveryDate = deliveryDate ?? new Date();
    this._deliveryAddress = deliveryAddress ?? '';
    this._deliveryCity = deliveryCity ?? '';
    this._deliveryPostalCode = deliveryPostalCode ?? '';
    this._deliveryPrice = deliveryPrice ?? 0;
    this._total = total ?? 0;
    this._discount = discount ?? 0;
    this._isCart = isCart ?? false;
    this._orderProducts = orderProducts ?? [];
    this._user = user ?? null;
    this._payment = payment ?? null;
    this._orderStatus = orderStatus ?? OrderStatus.REQUEST_RECEIVED;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get orderDate(): Date {
    return this._orderDate;
  }

  set orderDate(value: Date) {
    this._orderDate = value;
  }

  get deliveryDate(): Date {
    return this._deliveryDate;
  }

  set deliveryDate(value: Date) {
    this._deliveryDate = value;
  }

  get deliveryAddress(): string {
    return this._deliveryAddress;
  }

  set deliveryAddress(value: string) {
    this._deliveryAddress = value;
  }

  get deliveryCity(): string {
    return this._deliveryCity;
  }

  set deliveryCity(value: string) {
    this._deliveryCity = value;
  }

  get deliveryPostalCode(): string {
    return this._deliveryPostalCode;
  }

  set deliveryPostalCode(value: string) {
    this._deliveryPostalCode = value;
  }

  get deliveryPrice(): number {
    return this._deliveryPrice;
  }

  set deliveryPrice(value: number) {
    this._deliveryPrice = value;
  }

  get total(): number {
    return this._total;
  }

  set total(value: number) {
    this._total = value;
  }

  get discount(): number {
    return this._discount;
  }

  set discount(value: number) {
    this._discount = value;
  }

  get isCart(): boolean {
    return this._isCart;
  }

  set isCart(value: boolean) {
    this._isCart = value;
  }

  get orderProducts(): IOrderProduct[] {
    return this._orderProducts;
  }

  set orderProducts(value: IOrderProduct[]) {
    this._orderProducts = value;
  }

  get user(): IUser | null {
    return this._user;
  }

  set user(value: IUser | null) {
    this._user = value;
  }

  get payment(): IPayment | null {
    return this._payment;
  }

  set payment(value: IPayment | null) {
    this._payment = value;
  }

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  set orderStatus(value: OrderStatus) {
    this._orderStatus = value;
  }

  public toString():string{
    return JSON.stringify(this);
  }

}
