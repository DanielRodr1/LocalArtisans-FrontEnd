import {Category} from "../entity/Category";

export interface IProduct{

  productId: number;
  name:string;
  description:string;
  image:string; // url --> Change to a type of file
  price:number;
  active:boolean;
  userId:number;
  category:Category;

}

