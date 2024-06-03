import {Category} from "../entity/Category";

export interface IProduct{
  productId:number;
  name:string;
  description:string;
  image:string;
  price:number;
  category:Category;
  userId:number;
}
