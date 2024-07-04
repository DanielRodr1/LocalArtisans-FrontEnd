import {IProduct} from "../interface/IProduct";
import {Category} from "./Category";
import {User} from "./User";

export class Product implements IProduct{

  private _productId:number;
  private _name:string;
  private _description:string;
  private _image:string;
  private _price:number;
  private _category:Category;
  private _userId:number;
  private _user:User;

  constructor(productId?: number, name?: string, description?: string, image?: string, price?: number, category?: Category, userId?: number) {
    this._productId = productId ? productId : 0;
    this._name = name ? name : '';
    this._description = description ? description : '';
    this._image = image ? image: '';
    this._price = price ? price : 0;
    this._category = category ?  category : new Category();
    this._userId = userId ? userId : 0;
    this._user = new User();
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
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

  get category(): Category {
    return this._category;
  }

  set category(value: Category) {
    this._category = value;
  }

  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
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
      userId: this._userId,
      category: this._category
    }
  }

}
