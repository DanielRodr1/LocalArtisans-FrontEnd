import {IPayment} from "../interface/IPayment";
import {IOrder} from "../interface/IOrder";

export class Payment implements IPayment {
  private _id: number;
  private _userEmail: string;
  private _amount: number;
  private _order: IOrder | null;

  constructor(id?: number, userEmail?: string, amount?: number, order?: IOrder) {
    this._id = id ?? 0;
    this._userEmail = userEmail ?? '';
    this._amount = amount ?? 0;
    this._order = order ?? null;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get userEmail(): string {
    return this._userEmail;
  }

  set userEmail(value: string) {
    this._userEmail = value;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(value: number) {
    this._amount = value;
  }

  get order(): IOrder | null {
    return this._order;
  }

  set order(value: IOrder | null) {
    this._order = value;
  }

  public toString(): string{
    return JSON.stringify(this)
  }

}
