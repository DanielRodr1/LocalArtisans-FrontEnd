import {IProduct} from "../interface/IProduct";
import {Category} from "./Category";

export class Product implements IProduct{

  private _productId:number;
  private _name:string;
  private _description:string;
  private _image:string;
  private _price:number;
  private _active:boolean;
  private _userId:number;
  private _category:Category;

  constructor(productId?: number, name?: string, description?: string, image?: string, price?: number,
              active?: boolean, userId?: number, category?: Category) {
    this._productId = productId ? productId : 0;
    this._name = name ? name : '';
    this._description = description ? description : '';
    this._image = image ? image: '';
    this._price = price ? price : 0;
    this._active = active ? active : true;
    this._category = category ?  category : new Category();
    this._userId = userId ? userId : 0;
  }

  get productId(): number {
    return this._productId;
  }

  set productId(value: number) {
    this._productId = value;
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

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
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

  get category(): Category {
    return this._category;
  }

  set category(value: Category) {
    this._category = value;
  }

  public toString():string{
    return JSON.stringify(this);
  }

  public toJSON() : object{
    return {
      productId: this._productId,
      name: this._name,
      description: this._description,
      image: this._image,
      price: this._price,
      active:this._active,
      userId: this._userId,
      category: this._category
    }
  }

}
