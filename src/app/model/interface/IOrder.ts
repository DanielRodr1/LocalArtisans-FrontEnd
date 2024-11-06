
import {OrderStatus} from "../entity/enums/order-status";
import {IUser} from "./IUser";
import {IPayment} from "./IPayment";
import {IOrderProduct} from "./IOrderProduct";

export interface IOrder {

  id?: number;
  orderDate?: Date;
  deliveryDate?: Date;
  deliveryAddress?: string;
  deliveryCity?: string;
  deliveryPostalCode?: string;
  deliveryPrice?: number;
  total?: number;
  discount?: number;
  isCart?: boolean;
  orderProducts?: IOrderProduct[];
  user?: IUser | null;
  payment?: IPayment | null;
  orderStatus?: OrderStatus;

}
