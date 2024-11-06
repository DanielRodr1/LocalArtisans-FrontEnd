import {IOrder} from "./IOrder";
export interface IPayment {

  id: number;
  userEmail: string;
  amount: number;
  order: IOrder | null;

}
