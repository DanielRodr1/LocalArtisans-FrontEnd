import {Category} from "../entity/Category";
import {User} from "../entity/User";

export interface IProduct{
  productId:number;
  name:string;
  description:string;
  image:string;
  price:number;
  category:Category;
  userId:number;
  user: User;
}
