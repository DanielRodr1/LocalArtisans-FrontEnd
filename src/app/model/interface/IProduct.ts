import {ICategory} from "./ICategory";
import {ProductImg} from "../entity/ProductImg";

export interface IProduct{

  id: number;
  name:string;
  description:string;
  price:number;
  active:boolean;
  userId:number;
  category:ICategory | null;
  images: ProductImg[];

}

