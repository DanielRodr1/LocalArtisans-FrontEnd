import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {UserServiceService} from "../../../../service/UserService.service";
import {User} from "../../../../model/entity/User";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})
export class LoginRegisterComponent implements OnInit{

  public codigo : boolean;
  public users: User[];
  public userId:number;
  public fullName:string;
  public dni:string;
  public email:string;
  public phone:string;
  public userType:string;
  public profileImage:string;
  public password:string;
  public passwordValidation: string;
  public codigoArtesano: string;


  public constructor(private _userService: UserServiceService) {
    this.codigo = false;
    this.users = [];
    this.userId = 0;
    this.fullName = '';
    this.dni = '';
    this.email = '';
    this.phone = '';
    this.codigoArtesano = '';
    this.userType = '';
    this.profileImage = '';
    this.password = '';
    this.passwordValidation = '';
  }

  public ngOnInit(){}


  onRoleChange(event: Event) : void {
    const roleSelect = event.target as HTMLSelectElement; //Captura el Select con su value
    const value = roleSelect.value; //Agarra el value del Select

    if(value == 'vendedor'){
      this.codigo = true;
    } else {
      this.codigo = false
    }
  }

  public crearUsuario(): void{

    let user: User = new User();

    user.email = this.email;
    user.password = this.password;
    user.fullName = this.fullName;
    user.profileImage = this.profileImage;
    user.dni = this.dni;
    user.codigoArtesano = this.codigoArtesano;
    user.userType = this.userType;
    user.phone = this.phone;

    this._userService
      .createUser(user)
      .subscribe( {
        next: (user: User): void =>{
          this.users.push(user);
          this.resetForm();
        },
        error: (error): void =>{
          alert(error.message);
        }
      });

  }

  private resetForm(): void {
    this.fullName = '';
    this.email = '';
    this.password = '';
    this.profileImage = '';
    this.dni = '';
    this.codigoArtesano = '';
    this.userType = '';
    this.phone = '';
    this.passwordValidation = '';
  }

}
