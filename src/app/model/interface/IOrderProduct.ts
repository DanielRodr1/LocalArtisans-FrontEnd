import {IOrder} from "./IOrder";
import {ProductInfo} from "../entity/DTOs/product-info";

export interface IOrderProduct {

  id: number;
  productId: number;
  quantity: number;
  order: IOrder | null;
  productDetails: ProductInfo | null  // Additional field to get the Product Details

}
