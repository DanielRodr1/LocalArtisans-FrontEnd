import {IUser} from "../interface/IUser";

export class User implements IUser{

  // Attributes
  private _userId:number;
  private _fullName:string;
  private _dni:string;
  private _email:string;
  private _phone:string;
  private _userType:string;
  private _profileImage:string;
  private _password:string;
  private _artisanCode: string;

  // Constructor
  constructor(userId?: number, fullName?: string, dni?: string, email?: string, phone?: string, artisanCode?: string, userType?: string, profileImage?: string, password?: string) {
    this._userId = userId ? userId : 0;
    this._fullName = fullName ? fullName: '';
    this._dni = dni ? dni : '';
    this._email = email ? email : '';
    this._phone = phone ? phone : '';
    this._artisanCode = artisanCode ? artisanCode : '';
    this._userType = userType ? userType : '';
    this._profileImage = profileImage ? profileImage : '';
    this._password = password ? password : '';
  }

  // Getters & Setters


  get artisanCode(): string {
    return this._artisanCode;
  }

  set artisanCode(value: string) {
    this._artisanCode = value;
  }

  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }

  get fullName(): string {
    return this._fullName;
  }

  set fullName(value: string) {
    this._fullName = value;
  }

  get dni(): string {
    return this._dni;
  }

  set dni(value: string) {
    this._dni = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get phone(): string {
    return this._phone;
  }

  set phone(value: string) {
    this._phone = value;
  }

  get userType(): string {
    return this._userType;
  }

  set userType(value: string) {
    this._userType = value;
  }

  get profileImage(): string {
    return this._profileImage;
  }

  set profileImage(value: string) {
    this._profileImage = value;
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
      userId: this._userId,
      fullName: this._fullName,
      dni: this._dni,
      email: this._email,
      phone: this._phone,
      artisanCode: this._artisanCode,
      userType: this._userType,
      profileImage: this._profileImage,
      password: this._password
    }
  }

}
