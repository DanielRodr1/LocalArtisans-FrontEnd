import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {UserServiceService} from "../../../../service/UserService.service";
import {User} from "../../../../model/entity/User";
import {FormsModule} from "@angular/forms";
import {LoginResponse} from "../../../../model/views/LoginResponse";
import {AuthServiceService} from "../../../../service/AuthService.service";
import {Router} from "@angular/router";

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

  public emailLogin:string;
  public passwordLogin:string;


  public constructor(private _userService: UserServiceService, private _authService: AuthServiceService, private router: Router) {
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
    this.emailLogin = '';
    this.passwordLogin = '';
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

  public login(){

    let loginResponse: LoginResponse = new LoginResponse(this.emailLogin, this.passwordLogin);

    this._authService
      .login(loginResponse)
      .subscribe( {
        next: (loginResponse : LoginResponse): void =>{
          this.findByEmail(loginResponse.email);
          this.router.navigateByUrl('/home-page').then(success => {
            if (success) {
              console.log('Navigation is successful!');
              window.location.reload();
            } else {
              console.log('Navigation has failed!');
            }
          }).catch(error => {
            console.error('Navigation error:', error);
          });
        },
        error: (error): void =>{
          alert(error.message);
        }
      });
  }

  private findByEmail(email: string){
    this._userService
      .findByEmail(email)
      .subscribe( {
        next: (user : User): void =>{
          this.resetFormLogin();
          // sessionStorage.setItem("userLogin", user.toString());
          sessionStorage.setItem("userLogin", JSON.stringify(user));
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

  private resetFormLogin(): void {
    this.emailLogin = '';
    this.passwordLogin = '';
  }

}
