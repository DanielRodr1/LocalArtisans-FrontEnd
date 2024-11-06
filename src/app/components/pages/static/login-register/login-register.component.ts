import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {UserService} from "../../../../service/user.service";
import {User} from "../../../../model/entity/User";
import {FormsModule} from "@angular/forms";
import {AuthServiceService} from "../../../../service/AuthService.service";
import {Router} from "@angular/router";
import {UserType} from "../../../../model/entity/enums/user-type";
import {LoginRequest} from "../../../../model/views/login-request";
import {ILoginResponse} from "../../../../model/interface/ILoginResponse";

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

  public showArtisanCode: boolean = false;
  public users: User[] = [];
  public userId: number = 0;
  public fullName: string = '';
  public dni: string = '';
  public email: string = '';
  public password: string = '';
  public phone: string = '';
  public artisanCode: string = '';
  public userType: UserType = UserType.CLIENT;
  public profileImage: string = '';
  public passwordValidation: string = '';

  public emailLogin: string = '';
  public passwordLogin: string = '';


  public constructor(private _userService: UserService, private _authService: AuthServiceService, private router: Router) {}

  public ngOnInit(){}


  onRoleChange(event: Event) : void {
    const roleSelect = event.target as HTMLSelectElement; // Capture with its value
    const value = roleSelect.value; // Set value with the role selected
    this.showArtisanCode = value == 'artisan';
  }

  public createUser(): void{

    let user: User = new User();
    user.email = this.email;
    user.password = this.password;
    user.fullName = this.fullName;
    user.profileImage = this.profileImage;
    user.dni = this.dni;
    user.artisanCode = this.artisanCode;
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
    let loginRequest: LoginRequest = new LoginRequest(this.emailLogin, this.passwordLogin);
    //console.log('Sending login request:', loginRequest);
    this._authService.login(loginRequest).subscribe({
      next: (loginResponse : ILoginResponse): void =>{
        if (loginResponse && loginResponse.userId) {
          // Store the user in session
          sessionStorage.setItem("userLogin", JSON.stringify(loginResponse));
          //console.log('User stored in session:', loginResponse);

          // Change isLoggedIn Subject status
          this._authService.setLoginStatus(true);

          // Redirect user to Homepage
          this.router.navigate(['/home-page']).then(success => {
            if (success) {
              console.log('Navigation is successful!');
            } else {
              console.log('Navigation has failed!');
            }
          }).catch(err => {
            console.error('Navigation error:', err);
          });
        } else {
          console.error('Login response does not contain userId or other required data');
          alert('User ID is missing in the login response');
        }
      },
      error: (error): void => {
        alert(error.message || 'Login failed');
        console.error('Login error:', error);
      }
    });
  }

  private resetForm(): void {
    this.fullName = '';
    this.email = '';
    this.password = '';
    this.profileImage = '';
    this.dni = '';
    this.artisanCode = '';
    this.userType = UserType.CLIENT;
    this.phone = '';
    this.passwordValidation = '';
  }

}
