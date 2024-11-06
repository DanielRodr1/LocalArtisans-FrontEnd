import {ILoginResponse} from "../interface/ILoginResponse";
import {UserType} from "../entity/enums/user-type";

export class LoginResponse implements ILoginResponse{

  private _userId: number;
  private _email: string;
  private _fullName: string;
  private _userType: UserType;


  constructor(userId?: number, email?: string, fullName?: string, userType?: UserType) {
    this._userId = userId ?? 0;
    this._email = email ?? '';
    this._fullName = fullName ?? '';
    this._userType = userType ?? UserType.CLIENT;
  }

  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get fullName(): string {
    return this._fullName;
  }

  set fullName(value: string) {
    this._fullName = value;
  }

  get userType(): UserType {
    return this._userType;
  }

  set userType(value: UserType) {
    this._userType = value;
  }

  public toString():string{
    return JSON.stringify(this);
  }

  public toJSON() : object{
    return {
      userId: this._userId,
      email: this._email,
      fullName: this._fullName,
      userType: this._userType
    }
  }

}
