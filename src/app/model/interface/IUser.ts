import {UserType} from "../entity/enums/user-type";

export interface IUser{

  userId:number;
  fullName:string;
  dni: string;
  email: string;
  password: string;
  phone: string;
  artisanCode: string;
  userType: UserType;
  profileImage: string;

}
