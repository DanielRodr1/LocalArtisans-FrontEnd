import {ILoginResponse} from "../interface/ILoginResponse";

export class LoginResponse implements ILoginResponse{
  private _email: string;
  private _password: string;


  constructor(email?: string, password?: string) {
    this._email = email ? email : '';
    this._password = password ? password : '';
  }


  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  public toString():string{
    return JSON.stringify(this);
  }

  public toJSON() : object{
    return {
      email: this._email,
      password: this._password
    }
  }

}
