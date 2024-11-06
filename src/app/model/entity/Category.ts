import {ICategory} from "../interface/ICategory";

export class Category implements ICategory{

  private _categoryId: number;
  private _name:string;
  private _description:string;

  constructor(categoryId?: number, name?: string, description?: string) {
    this._categoryId = categoryId ?? 0;
    this._name = name ?? '';
    this._description = description ?? '';
  }


  get categoryId(): number {
    return this._categoryId;
  }

  set categoryId(value: number) {
    this._categoryId = value;
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

  public toString():string{
    return JSON.stringify(this);
  }

  public toJSON() : object{
    return {
      categoryId: this._categoryId,
      name: this._name,
      description: this._description
    }
  }

}
