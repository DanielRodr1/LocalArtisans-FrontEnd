import {ICategory} from "./ICategory";

export interface IProduct{

  productId: number;
  name:string;
  description:string;
  price:number;
  active:boolean;
  userId:number;
  category:ICategory | null;

}

