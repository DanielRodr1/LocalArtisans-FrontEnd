import {IProductImg} from "../interface/IProductImg";

export class ProductImg implements IProductImg {

  private _id:number;
  private _productId:number;
  private _url:string;
  private _isPrimary:boolean;


  constructor(id?: number, productId?: number, url?: string, isPrimary?: boolean) {
    this._id = id ?? 0;
    this._productId = productId ?? 0;
    this._url = url ?? '';
    this._isPrimary = isPrimary ?? false;
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

  get isPrimary(): boolean {
    return this._isPrimary;
  }

  set isPrimary(value: boolean) {
    this._isPrimary = value;
  }

  public toString():string{
    return JSON.stringify(this);
  }

}
