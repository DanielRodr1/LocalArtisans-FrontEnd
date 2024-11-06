import {UserType} from "../entity/enums/user-type";

export interface ILoginResponse {
  userId: number;
  email: string;
  fullName: string;
  userType: UserType;
}
