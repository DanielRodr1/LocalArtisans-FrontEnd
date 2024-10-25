import {Category} from "../entity/Category";

export interface IProduct{

  productId: number;
  name:string;
  description:string;
  price:number;
  active:boolean;
  userId:number;
  category:Category;

}

