import {IProductImg} from "../interface/IProductImg";

export class ProductImg implements IProductImg {

  private _id:number;
  private _productId:number;
  private _url:string;


  constructor(id?: number, productId?: number, url?: string) {
    this._id = id ?? 0;
    this._productId = productId ?? 0;
    this._url = url ?? '';
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

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  public toString():string{
    return JSON.stringify(this);
  }

}
