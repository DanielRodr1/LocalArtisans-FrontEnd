import {IProduct} from "../interface/IProduct";
import {ICategory} from "../interface/ICategory";
import {ProductImg} from "./ProductImg";
export class Product implements IProduct{

  private _id:number;
  private _name:string;
  private _description:string;
  private _price:number;
  private _active:boolean;
  private _userId:number;
  private _category:ICategory | null;
  private _images: ProductImg[];

  constructor(id?: number, name?: string, description?: string, price?: number,
              active?: boolean, category?: ICategory, userId?: number, images?: ProductImg[]) {
    this._id = id ?? 0;
    this._name = name ??  '';
    this._description = description ?? '';
    this._price = price ?? 0;
    this._active = active ?? true;
    this._category = category ?? null;
    this._userId = userId ?? 0;
    this._images = images ?? [];
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get active(): boolean {
    return this._active;
  }

  set active(value: boolean) {
    this._active = value;
  }

  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }

  get category(): ICategory | null {
    return this._category;
  }

  set category(value: ICategory | null) {
    this._category = value;
  }

  get images(): ProductImg[] {
    return this._images;
  }

  set images(value: ProductImg[]) {
    this._images = value;
  }

  public toString():string{
    return JSON.stringify(this);
  }

  public toJSON(): object {
    return {
      id: this._id,
      name: this._name,
      description: this._description,
      price: this._price,
      active: this._active,
      userId: this._userId,
      category: this._category ? { ...this._category } : null // Serializa category si está presente
    };
  }

}
